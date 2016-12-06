import AsyncMachine from 'asyncmachine'
import {
  IState,
  IBind,
  IEmit,
  TStates
} from './gmail-query-types'
import * as moment from 'moment';
import Gmail from './gmail'
import { Semaphore } from 'await-semaphore';
import * as google from 'googleapis'
import { map } from 'typed-promisify'

export type Thread = google.gmail.v1.Thread

export class States extends AsyncMachine<TStates, IBind, IEmit> {

  Enabled: IState = {};
  Dirty: IState = {
    drop: ['MsgsFetched', 'ThreadsFetched']
  };

  FetchingThreads: IState = {
    auto: true,
    require: ['Enabled'],
    drop: ['ThreadsFetched']
  };
  ThreadsFetched: IState = {
    require: ['Enabled'],
    drop: ['FetchingThreads'],
  };

  FetchingMsgs: IState = {
    require: ['Enabled', 'ThreadsFetched'],
    drop: ['MsgsFetched']
  };
  MsgsFetched: IState = {
    require: ['Enabled'],
    drop: ['FetchingMsgs']
  };

	constructor(target: GmailQuery) {
		super(target)
		this.registerAll()
	}
}

export type TThreadCompletion = {
  completed: boolean,
  time: moment.Moment
}

export default class GmailQuery {
  gmail: Gmail;
	api: google.gmail.v1.Gmail;
  states: States;
	semaphore: Semaphore;
  synced_history_id: number | null;

  threads: Thread[] = [];
  query: string;
  name: string;
  completions = new Map<string, TThreadCompletion>();
  previous_threads: Thread[] | null = null;
  fetch_msgs: boolean;

  constructor(gmail: Gmail, query: string, name = '', fetch_msgs = false) {
    this.gmail = gmail;
    this.query = query;
    this.name = name;
    this.semaphore = gmail.semaphore
    this.fetch_msgs = fetch_msgs;
    this.api = this.gmail.api;
    this.states = new States(this)
    if (process.env['DEBUG']) {
      this.states.id(`GmailQuery '${name}'`)
        .logLevel(process.env['DEBUG'])
      global.am_network.addMachine(this.states)
    }
  }

	async req<A,T,T2>(method: (arg: A, cb: (err: any, res: T, res2: T2) => void) => void, params: A, abort: (() => boolean) | null | undefined, returnArray: true): Promise<{0:T,1:T2} | null>;
	async req<A,T>(method: (arg: A, cb: (err: any, res: T) => void) => void, params: A, abort: (() => boolean) | null | undefined, returnArray: false): Promise<T | null>;
	async req<A,T>(method: (arg: A, cb: (err: any, res: T) => void) => void, params: A, abort: (() => boolean) | null | undefined, returnArray: boolean): Promise<any> {
    return returnArray
      ? this.gmail.req(method, params, abort, true)
      : this.gmail.req(method, params, abort, false)
  }

  // TODO should download messages in parallel with next threads list pages
  async FetchingThreads_state() {
    let abort = this.states.getAbort('FetchingThreads');
    if (await this.isCached(abort)) {
      if (abort())
        return
      console.log(`[CACHED] threads for '${this.query}'`)
      this.states.add('ThreadsFetched')
      if (this.fetch_msgs)
        this.states.add('MsgsFetched')
      return;
    }
    if (abort())
      return

    console.log(`[FETCH] threads' list for '${this.query}'`);
    let results: google.gmail.v1.Thread[] = []
    let prevRes: any
    while (true) {
      let params = {
        // TODO this should be optional
        // labelIds: '',
        // pageToken: ''
        // includeSpamTrash: false,
        maxResults: 1000,
        q: this.query,
        userId: "me",
        fields: "nextPageToken,threads(historyId,id)",
      }
      if (prevRes && prevRes.nextPageToken) {
        console.log(`[FETCH] next page for threads' list for '${this.query}'`);
        params.pageToken = prevRes.nextPageToken;
      }

      let list = await this.req(this.api.users.threads.list, params, abort, false)
      // TODO WTF
      if (!list)
        break;
      if (abort())
        return

      if (list.threads)
        results.push(...list.threads)

      if (!list.nextPageToken)
        break

      prevRes = list
    }

    // TODO could be done in parallel with downloading of the results
    let history_id = await this.gmail.getHistoryId(abort);
    if (abort())
      return

    this.previous_threads = this.threads;
    this.threads = results

    this.updateThreadsCompletions();

//    console.log "Found #{@result.threads.length} threads"
    if (!this.fetch_msgs) {
      this.synced_history_id = history_id;
    }

    this.states.add('ThreadsFetched');

    if (this.fetch_msgs) {
      abort = this.states.getAbort('ThreadsFetched');
      this.states.add('FetchingMsgs', history_id, abort);
    } else {
      this.previous_threads = null;
    }
  }

  async FetchingMsgs_state(history_id: number, abort?: () => boolean) {
    abort = this.states.getAbort('FetchingMsgs', abort)

    // TODO use the awaitable map
    let threads = await map(this.threads, async (thread: google.gmail.v1.Thread) => {
      // check if the thread has been previously downloaded and if
      // the history ID has changed
      let previous = this.previous_threads && this.previous_threads.find(item => (
        item.id === thread.id && item.historyId === thread.historyId))

      if (previous)
        return previous;
      else
        return await this.gmail.fetchThread(thread.id, parseInt(thread.historyId, 10), abort);
    })

    if (abort())
      return;

    // ensure all the requested threads were downloaded
    // TODO retry the missing ones?
    if (threads && threads.every( thread => Boolean(thread))) {
      this.synced_history_id = history_id;
      this.threads = threads as google.gmail.v1.Thread[];
      this.previous_threads = null;
      this.states.add('MsgsFetched')
    } else {
      console.log('[FetchingMsgs] nore results or some missing]')
    }
  }

  Dirty_state() {
    this.states.drop('Dirty');
  }

  async isCached(abort: () => boolean): Promise<boolean | null> {
    return this.synced_history_id
      ? await this.gmail.isCached(this.synced_history_id, abort)
      : false
  }


  // update completion statuses
  updateThreadsCompletions() {
    let non_completed_ids: string[] = [];
    // create / update existing threads completion data
    for (let thread of this.threads) {
      let completion = this.completions[thread.id];
      // update the completion if thread is new or completion status has changed
      if (completion && completion.completed || !completion) {
        this.completions.set(thread.id, {
          completed: false,
          time: moment()
        })
      }

      non_completed_ids.push(thread.id)
    }

    // complete threads not found in the query results
    for (let [id, row] of this.completions.entries()) {
      // TODO build non_completed
      if (non_completed_ids.includes(id))
        return
      if (row.completed)
        return
      row.completed = true;
      row.time = moment();
      console.log(`Marking thread as completed by query (${id})`);
    }
  }


  threadWasCompleted(id: string): moment.Moment | null {
    let thread = this.completions.get(id)
    if (thread && thread.completed)
      return thread.time
    return null
  }


  threadWasNotCompleted(id: string): moment.Moment | null {
    let thread = this.completions.get(id)
    if (thread && !thread.completed)
      return thread.time;
    return null
  }


  threadSeen(id: string) {
    return Boolean(this.completions.get(id))
  }
}