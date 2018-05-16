import firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));

export const firebaseDB = firebase.database();

export async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  await firebase.auth().signInWithPopup(provider);
}

export async function signInWithTwitter() {
  const provider = new firebase.auth.TwitterAuthProvider();
  await firebase.auth().signInWithPopup(provider);
}

export async function signInWithGithub() {
  const provider = new firebase.auth.GithubAuthProvider();
  await firebase.auth().signInWithPopup(provider);
}

export async function firebaseSignOut() {
  await firebase.auth().signOut();
}
