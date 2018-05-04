import * as firebase from 'firebase';
// import { setAuthNotificationFlag } from './localStorage';
// import { syncLocalStorageWithFirebase } from './index';

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

// async function onLogin(user) {
//   setAuthNotificationFlag(true);
//   await syncLocalStorageWithFirebase(user);
// }

export async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  const result = await firebase.auth().signInWithPopup(provider);

  // if (result && result.user) {
  //   await onLogin(result.user);
  // }
}

export async function signInWithTwitter() {
  const provider = new firebase.auth.TwitterAuthProvider();
  // provider.addScope('profile');
  // provider.addScope('email');
  const result = await firebase.auth().signInWithPopup(provider);

  // if (result && result.user) {
  //   await onLogin(result.user);
  // }
}

export async function firebaseSignOut() {
  await firebase.auth().signOut();
}
