// Generated by CoffeeScript 1.8.0
(function() {
  var IMessage, IMessagePart, IQuery, ITask, ITaskList, ITaskLists, ITasks, IThread, IThreads, Promise, Query, States, Sync, async, asyncmachine, auth, coroutine, google, opt, promise_exception, promisify, type, typedef, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  auth = require('../auth');

  async = require('async');

  asyncmachine = require('asyncmachine');

  google = require('googleapis');

  Promise = require('bluebird');

  Promise.longStackTraces();

  coroutine = Promise.coroutine;

  promisify = Promise.promisify;

  typedef = require('tracery');

  opt = typedef.Optional;

  _ref = require('./api-types'), ITaskList = _ref.ITaskList, ITaskLists = _ref.ITaskLists, IQuery = _ref.IQuery, IThread = _ref.IThread, IThreads = _ref.IThreads, ITask = _ref.ITask, ITasks = _ref.ITasks, IMessage = _ref.IMessage, IMessagePart = _ref.IMessagePart;

  type = function(value, type, name) {
    if (Object.isArray(type)) {
      type = typedef(type);
    }
    if (!type(value)) {
      console.log(value);
      throw new TypeError(name || '');
    }
    return value;
  };

  promise_exception = function(e) {
    if (e.errors) {
      console.log(e.errors);
    }
    return console.log((e.stack.split("\n")).join("\n"));
  };

  States = (function(_super) {
    __extends(States, _super);

    function States() {
      States.__super__.constructor.apply(this, arguments);
      this.register('Ready', 'Authenticating', 'Authenticated', 'Syncing', 'Synced');
    }

    States.prototype.Ready = {
      auto: true,
      requires: ['Authenticated']
    };

    States.prototype.Authenticating = {
      blocks: ['Authenticated']
    };

    States.prototype.Authenticated = {
      blocks: ['Authenticating']
    };

    States.prototype.Syncing = {
      auto: true,
      requires: ['Ready'],
      blocks: ['Synced']
    };

    States.prototype.Synced = {
      blocks: ['Syncing']
    };

    return States;

  })(asyncmachine.AsyncMachine);

  Function.prototype.defineType = function(name, type, type_name) {
    return Object.defineProperty(this.prototype, name, {
      set: function(v) {
        type(v, ITaskLists, 'ITaskLists');
        return this.__task_lists = v;
      },
      get: function() {
        return this.__task_lists;
      }
    });
  };

  Sync = (function() {
    Sync.prototype.states = null;

    Sync.prototype.config = null;

    Sync.prototype.auth = null;

    Sync.prototype.tasks = null;

    Sync.prototype.gmail = null;

    Sync.prototype.task_lists = null;

    Sync.defineType('task_lists', ITaskLists, 'ITaskLists');

    function Sync(config) {
      this.config = config;
      this.states = new States;
      if (config.debug) {
        this.states.debug('Sync ', 2);
      }
      this.task_lists = [];
      this.labels = [];
      this.auth = new auth.Auth(config);
      this.tasks = new google.tasks('v1', {
        auth: this.auth.client
      });
      this.gmail = new google.gmail('v1', {
        auth: this.auth.client
      });
      this.states.add('Authenticating');
      this.states.on('Syncing.enter', (function(_this) {
        return function() {
          var promise;
          console.log('Syncing.enter');
          promise = _this.Syncing_enter();
          return promise["catch"](promise_exception);
        };
      })(this));
      this.states.on('Syncing.enter', this.Synced_enter);
      this.auth.pipeForward('Ready', this.states, 'Authenticated');
    }

    return Sync;

  })();

  Query = (function(_super) {
    __extends(Query, _super);

    Query.prototype.query = null;

    Query.prototype.list = null;

    Query.prototype.tasks = null;

    function Query(query) {
      this.query = query;
      Query.__super__.constructor.apply(this, arguments);
      this.register('Ready', 'Authenticating', 'Authenticated', 'Syncing', 'Synced');
    }

    Query.prototype.Syncing = {
      blocks: ['Synced']
    };

    Query.prototype.Synced = {
      blocks: ['Syncing']
    };

    Query.prototype.FetchingTaskLists = {
      requires: ['Syncing'],
      block: ['TaskListsFetched']
    };

    Query.prototype.TaskListsFetched = {
      block: ['FetchingTaskLists']
    };

    Query.prototype.FetchingLabels = {
      requires: ['Syncing'],
      block: ['LabelsFetched']
    };

    Query.prototype.LabelsFetched = {
      block: ['FetchingLabels']
    };

    Query.prototype.FetchingThreads = {
      auto: true,
      requires: ['Syncing'],
      block: ['ThreadsFetched']
    };

    Query.prototype.ThreadsFetched = {
      block: ['FetchingThreads']
    };

    Query.prototype.PreparingList = {
      auto: true,
      requires: ['Syncing'],
      block: ['ListReady']
    };

    Query.prototype.ListReady = {
      block: ['PreparingList']
    };

    Query.prototype.FetchingTasks = {
      auto: true,
      requires: ['Syncing', 'ListReady'],
      block: ['TasksFetched']
    };

    Query.prototype.TasksFetched = {
      requires: ['ListReady'],
      block: ['FetchingTasks']
    };

    Query.prototype.SyncingThreadsToTasks = {
      auto: true,
      requires: ['Syncing', 'TasksFetched', 'ThreadsFetched', 'LabelsFetched'],
      block: ['ThreadsToTasksSynced']
    };

    Query.prototype.ThreadsToTasksSynced = {
      block: ['SyncingThreadsToTasks']
    };

    Query.prototype.SyncingThreadsToTasks = {
      auto: true,
      requires: ['Syncing', 'TasksFetched', 'ThreadsFetched', 'LabelsFetched'],
      block: ['ThreadsToTasksSynced']
    };

    Query.prototype.ThreadsToTasksSynced = {
      block: ['SyncingThreadsToTasks']
    };

    Query.prototype.SyncingCompletedTasks = {
      auto: true,
      requires: ['Syncing', 'ThreadsToTasksSynced'],
      block: ['CompletedTasksSynced']
    };

    Query.prototype.CompletedTasksSynced = {
      block: ['SyncingCompletedTasks']
    };

    Query.prototype.SyncingTasksToThreads = {
      auto: true,
      requires: ['Syncing', 'TasksFetched', 'ThreadsFetched', 'LabelsFetched'],
      block: ['SyncingTasksToThreads']
    };

    Query.prototype.TasksToThreadsSynced = {
      block: ['SyncingTasksToThreads']
    };

    Query.prototype.FetchingLabels_enter = coroutine(function*() {
      var res;
      res = (yield this.req(this.gmail.users.labels.list, {
        userId: 'me'
      }));
      this.labels = res[0].labels;
      return this.add('LabelsFetched');
    });

    Query.prototype.FetchingTaskLists_enter = coroutine(function*() {
      var res;
      res = (yield this.req(this.tasks.tasklists.list));
      this.task_lists = type(res[0].items, ITaskLists, 'ITaskLists');
      return this.add('TaskListsFetched');
    });

    Query.prototype.FetchingTasks_FetchingTasks = Query.FetchingTasks_enter;

    Query.prototype.SyncingCompletedTasks_enter = coroutine(function*() {
      var k, task, _i, _len, _ref1;
      _ref1 = this.tasks || [];
      for (k = _i = 0, _len = _ref1.length; _i < _len; k = ++_i) {
        task = _ref1[k];
        if ((this.tasks_in_threads.contains(task.id)) || task.status === 'completed') {
          continue;
        }
        if (/^email:/.test(task.notes)) {
          (yield this.req(this.tasks.tasks.patch, {
            tasklist: this.list.id,
            task: task.id,
            resource: {
              status: 'completed'
            }
          }));
          console.log("Task completed by email - '" + task.title + "'");
        }
      }
      (yield this.req(this.tasks.tasks.clear, {
        tasklist: list.id
      }));
      return this.add('CompletedTasksSynced');
    });

    Query.prototype.SyncingThreadsToTasks_enter = coroutine(function*() {
      (yield Promise.all(this.threads.map(this.getTaskForThread)));
      return this.add('ThreadsToTasksSynced');
    });

    Query.prototype.SyncingTasksToThreads_enter = coroutine(function*() {
      var k, labels, labels_ids, subject, task, thread, _i, _len, _ref1, _ref2, _ref3;
      this.tasks_in_threads = [];
      _ref1 = this.tasks || [];
      for (k = _i = 0, _len = _ref1.length; _i < _len; k = ++_i) {
        task = _ref1[k];
        if (!task.title || task.status === 'completed' || ((_ref2 = task.notes) != null ? _ref2.match(/\bemail:\w+\b/) : void 0)) {
          continue;
        }
        labels = ['INBOX'].concat(this.query['labels_new_task'] || [], ((_ref3 = this.config.tasks.queries.labels_defaults) != null ? _ref3['new_task'] : void 0) || []);
        subject = task.title;
        console.log("Creating email '" + subject + "' (" + (labels.join(', ')) + ")");
        thread = (yield this.req(this.gmail.users.messages.insert, {
          userId: 'me',
          resource: {
            raw: this.createEmail(subject)
          }
        }));
        labels_ids = labels.map((function(_this) {
          return function(name) {
            var label;
            label = _this.labels.find(function(label) {
              return label.name === name;
            });
            return label.id;
          };
        })(this));
        (yield this.req(this.gmail.users.messages.modify, {
          id: thread[0].id,
          userId: 'me',
          resource: {
            addLabelIds: labels_ids
          }
        }));
        if (task.notes == null) {
          task.notes = "";
        }
        task.notes = "" + task.notes + "\nemail:" + thread[0].id;
        (yield this.req(this.tasks.tasks.patch, {
          tasklist: list_id,
          task: task.id,
          userId: 'me',
          resource: {
            notes: task.notes
          }
        }));
      }
      this.tasks_in_threads.push(task.id);
      return this.add('ThreadsToTasksSynced');
    });

    Query.prototype.PreparingList_enter = function*() {
      var list, r, _i, _len, _ref1;
      this.name;
      list = null;
      this.def_title = this.query.labels_in_title || this.config.labels_in_title;
      _ref1 = this.task_lists;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        r = _ref1[_i];
        if (this.name === r.title) {
          list = r;
          break;
        }
      }
      if (!list) {
        list = (yield this.createTaskList(this.name));
        console.log("Creating tasklist '" + this.name + "'");
      }
      this.list = type(list, ITasks, 'ITasks');
      return this.add('ListReady');
    };

    Query.prototype.FetchingThreads_enter = function*() {
      var query, res, threads;
      res = (yield this.req(this.gmail.users.threads.list, {
        q: this.query.query,
        userId: "me"
      }));
      query = res[0];
      if (query.threads == null) {
        query.threads = [];
      }
      threads = (yield Promise.all(query.threads.map((function(_this) {
        return function(item) {
          return _this.req(_this.gmail.users.threads.get, {
            id: item.id,
            userId: 'me',
            metadataHeaders: 'SUBJECT',
            format: 'metadata',
            fields: 'id,messages(id,labelIds,payload(headers))'
          });
        };
      })(this))));
      query.threads = threads.map(function(item) {
        return item[0];
      });
      return this.threads = type(query, IThreads, 'IThreads');
    };

    Query.prototype.FetchingTasks_enter = coroutine(function*() {
      var res;
      res = (yield this.req(this.tasks.tasks.list, {
        updatedMin: this,
        tasklist: this.list.id,
        fields: "etag,items(id,title,notes)",
        maxResults: 1000,
        showCompleted: false
      }));
      this.tasks = type(res[0], ITasks, 'ITasks');
      return this.add('TasksFetched');
    });

    Query.prototype.req = function(method, params) {
      console.log('REQUEST');
      console.dir(params);
      if (params == null) {
        params = {};
      }
      params.auth = this.auth.client;
      return (promisify(method))(params);
    };

    Query.prototype.syncTaskName = coroutine(function*(task, thread) {
      return (yield true);
    });

    Query.prototype.createTaskList = coroutine(function*(name) {
      var res;
      res = (yield this.req(this.tasks.tasklists.insert, {
        resource: {
          title: name
        }
      }));
      return type(res[1].body, ITaskList, 'ITaskList');
    });

    Query.prototype.createTaskFromThread = coroutine(function*(thread) {
      var res, title;
      type(thread, IThread, 'IThread');
      title = this.getTaskTitleFromThread(thread);
      res = (yield this.req(this.tasks.tasks.insert, {
        tasklist: this.list.id,
        resource: {
          title: title,
          notes: "email:" + thread.id
        }
      }));
      console.log("Task added '" + title + "'");
      return type(res[0], ITask, 'ITask');
    });

    Query.prototype.createThreadFromTasks = coroutine(function(tasks, list_id, threads, query) {});

    Query.prototype.createEmail = function(subject) {
      var email;
      type(subject, String);
      email = ["From: " + this.config.gmail_username + " <" + this.config.gmail_username + ">s", "To: " + this.config.gmail_username, "Content-type: text/html;charset=utf-8", "MIME-Version: 1.0", "Subject: " + subject].join("\r\n");
      return new Buffer(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
    };

    Query.prototype.getTaskForThread = coroutine(function*(thread) {
      var task;
      task = this.tasks.find(function(item) {
        var _ref1;
        return (_ref1 = item.notes) != null ? _ref1.match("email:" + thread.id) : void 0;
      });
      if (!task) {
        task = (yield this.createTaskFromThread(thread));
      }
      return type(task, ITask, 'ITask');
    });

    Query.prototype.getTaskTitleFromThread = function(thread) {
      var extracted, title;
      title = thread.messages[0].payload.headers[0].value;
      extracted = this.extractLabelsFromThreadName(thread);
      if (this.config.def_title === 1) {
        return "" + (extracted[1].join(' ')) + " " + extracted[0];
      } else {
        return "" + extracted[0] + " " + (extracted[1].join(' '));
      }
    };


    /*
    	@name string
    	@return [ string, Array<Label> ]
     */

    Query.prototype.extractLabelsFromThreadName = function(thread) {
      var label, labels, name, prefix, r, symbol, _i, _len, _ref1;
      name = thread.messages[0].payload.headers[0].value;
      labels = [];
      _ref1 = this.config.auto_labels;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        r = _ref1[_i];
        symbol = r.symbol;
        label = r.label;
        prefix = r.prefix;
        name = name.replace("(\b|^)" + symbol + "(\w+)", '', function(label) {
          return labels.push(label);
        });
      }
      return type([name, labels], typedef.Vector([String, [String]]));
    };

    return Query;

  })(asyncmachine.AsyncMachine);

  module.exports = {
    Sync: Sync,
    States: States
  };

}).call(this);