import * as firebase from 'firebase';

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

export async function signInWithGoogle() {
  // Using a popup.
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  await firebase.auth().signInWithPopup(provider);
}

export async function signOut() {
  // Using a popup.
  await firebase.auth().signOut();
}
