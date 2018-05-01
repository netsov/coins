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
