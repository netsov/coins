import * as firebase from 'firebase';
import { setAuthWarningFlag } from './localStorage';
import { syncLocalStorageWithFirebase } from './index';

const config = {
  apiKey: 'AIzaSyBC1UBbwjkx-_hOVAR5NTk70JsdW3WfXso',
  authDomain: 'coins-dev-97fb1.firebaseapp.com',
  databaseURL: 'https://coins-dev-97fb1.firebaseio.com',
  projectId: 'coins-dev-97fb1',
  storageBucket: 'coins-dev-97fb1.appspot.com',
  messagingSenderId: '297026674925',
};

firebase.initializeApp(config);

export const firebaseDB = firebase.database();

// (async function f() {
//   const snapshot = await firebaseDB.ref().once('value');
//
//   console.log('value', snapshot.val());
// })();

async function onLogin(user) {
  setAuthWarningFlag(true);
  await syncLocalStorageWithFirebase(user);
}

export async function signInWithGoogle() {
  // Using a popup.
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  const result = await firebase.auth().signInWithPopup(provider);

  if (result && result.user) {
    await onLogin(result.user);
  }
}

export async function signOut() {
  // Using a popup.
  await firebase.auth().signOut();
  setAuthWarningFlag('');
}
