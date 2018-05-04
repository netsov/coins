import * as firebase from 'firebase';
// import { setAuthNotificationFlag } from './localStorage';
// import { syncLocalStorageWithFirebase } from './index';

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
};

firebase.initializeApp(config);

export const firebaseDB = firebase.database();
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

export async function signInWithGithub() {
  const provider = new firebase.auth.GithubAuthProvider();
  // provider.addScope('profile');
  // provider.addScope('email');
  const result = await firebase.auth().signInWithPopup(provider);

  // if (result && result.user) {
  //   await onLogin(result.user);
  // }
}

// export async function signInWithFacebook() {
//   const provider = new firebase.auth.FacebookAuthProvider();
//   // provider.addScope('profile');
//   // provider.addScope('email');
//   const result = await firebase.auth().signInWithPopup(provider);
//
//   // if (result && result.user) {
//   //   await onLogin(result.user);
//   // }
// }

export async function firebaseSignOut() {
  await firebase.auth().signOut();
}
