import submitForm from 'submit-form'
import { IAccount } from '../../src/types'

export async function initFirebase(config) {
  window.firebase.initializeApp(config)
}

export async function signInFirebase(force = false): Promise<TUser> {
  let user = window.firebase.auth().currentUser

  if (!user || force) {
    const provider = new window.firebase.auth.GoogleAuthProvider()
    if (user) {
      provider.setCustomParameters({ login_hint: user.email })
    }
    const result = await window.firebase.auth().signInWithPopup(provider)
    user = result.user
  }

  const id_token = await user.getIdToken()
  const email = user.email
  const uid = user.uid

  return { uid, email, id_token }
}

export async function signIn(): Promise<TUser | null> {
  const user = await signInFirebase()
  const account = await getAccount(user.uid)
  if (!account) {
    if (!(await createAccount(user.id_token))) {
      return null
    }
  }
  window.taskbot_account = account
  return user
}

export async function getAccount(uid): Promise<IAccount | null> {
  const db = window.firebase.database()
  const data = await db.ref('accounts').once('value')
  const accounts = data.val()
  return (accounts && accounts[uid]) || null
}

export async function signOut() {
  window.taskbot_account = null
  await window.firebase.auth().signOut()
}

export type TUser = {
  uid: string
  email: string
  id_token: string
}

export function onLogin(
  fn: (user: TUser) => void,
  every_state_change = false
): Function {
  return window.firebase.auth().onAuthStateChanged(async function(user) {
    if (!user) {
      if (every_state_change) {
        return fn(null)
      } else {
        return
      }
    }

    const id_token = await user.getIdToken()
    const email = user.email
    const uid = user.uid
    fn({ uid, email, id_token })
  })
}

export async function createAccount(id_token: string) {
  const res = await fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({ id_token })
  })
  return res.status === 200
}

/**
 * This method will redirect the browser.
 *
 * @param id_token
 */
export function authorizeAccess(id_token: string) {
  submitForm('/authorize', {
    method: 'POST',
    body: { id_token }
  })
}
