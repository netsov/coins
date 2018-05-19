let _firebase, _firebaseDB;

export async function signInWithGoogle() {
  const firebase = await importFirebase();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  await firebase.auth().signInWithPopup(provider);
}

export async function signInWithTwitter() {
  const firebase = await importFirebase();
  const provider = new firebase.auth.TwitterAuthProvider();
  await firebase.auth().signInWithPopup(provider);
}

export async function signInWithGithub() {
  const firebase = await importFirebase();
  const provider = new firebase.auth.GithubAuthProvider();
  await firebase.auth().signInWithPopup(provider);
}

export async function firebaseSignOut() {
  const firebase = await importFirebase();
  await firebase.auth().signOut();
}

export async function importFirebase() {
  if (!_firebase) {
    const [module] = await Promise.all([
      import(/* webpackChunkName: 'firebase-app' */ 'firebase/app'),
      import(/* webpackChunkName: 'firebase-auth' */ 'firebase/auth'),
      import(/* webpackChunkName: 'firebase-database' */ 'firebase/database'),
    ]);

    _firebase = module.default;
    _firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));
  }
  return _firebase;
}

export const firebaseDB = async () => {
  if (!_firebaseDB) {
    const firebase = await importFirebase();
    _firebaseDB = firebase.database();
  }
  return _firebaseDB;
};
