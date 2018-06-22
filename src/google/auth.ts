import AsyncMachine from 'asyncmachine'
import * as google from 'googleapis'
// Machine types
import {
  IBind,
  IEmit,
  IState,
  TStates
} from '../../typings/machines/google/auth'
import { TConfig, TConfigGoogle, TConfigGoogleUserAuth } from '../types'
import { machineLogToDebug } from '../utils'

export default class Auth extends AsyncMachine<TStates, IBind, IEmit> {
  CredentialsSet: IState = {}

  RefreshingToken: IState = {
    auto: true,
    require: ['CredentialsSet'],
    drop: ['TokenRefreshed']
  }

  TokenRefreshed: IState = {
    require: ['CredentialsSet'],
    drop: ['RefreshingToken']
  }

  Ready: IState = {
    auto: true,
    require: ['TokenRefreshed']
  }

  Error: IState = {
    drop: ['Ready']
  }

  client: any
  config: TConfigGoogle
  username: string

  get config_user(): TConfigGoogleUserAuth {
    return this.config.users[this.username]
  }

  constructor(config: TConfigGoogle, username: string) {
    super(null, false)
    // google.options({ params: { quotaUser: 'user123@example.com' } });
    this.config = config
    this.username = username
    this.register(
      'Ready',
      'CredentialsSet',
      'RefreshingToken',
      'TokenRefreshed'
    )
    this.id('Auth')
    // TODO avoid globals
    if (process.env['DEBUG_AM'] || global.am_network) {
      machineLogToDebug(this)
      if (global.am_network) {
        global.am_network.addMachine(this)
      }
    }
    // TODO missing type
    this.client = new (<any>google).auth.OAuth2(
      config.client_id,
      config.client_secret,
      config.redirect_url
    )
    if (this.config_user.access_token && this.config_user.refresh_token) {
      this.add(
        'CredentialsSet',
        this.config_user.access_token,
        this.config_user.refresh_token
      )
    } else {
      throw new Error('not-implemented')
    }
  }

  CredentialsSet_state(access_token: string, refresh_token: string) {
    this.client.credentials = {
      access_token: access_token,
      refresh_token: refresh_token
    }
  }

  RefreshingToken_state() {
    return this.client.refreshAccessToken(this.addByCallback('TokenRefreshed'))
  }
}
