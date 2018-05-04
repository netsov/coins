import * as firebase from 'firebase';
import { setAuthNotificationFlag } from '../utils/localStorage';
import {
  firebaseSignOut,
  signInWithGoogle,
  signInWithTwitter,
} from '../utils/firebase';

export const USER_CHANGED = 'USER_CHANGED';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const DISMISS_AUTH_NOTIFICATION = 'DISMISS_AUTH_NOTIFICATION';

export const getUser = () => dispatch => {
  firebase.auth().onAuthStateChanged(function(user) {
    dispatch({
      type: USER_CHANGED,
      user,
    });
  });
};

export const dismissAuthNotification = () => {
  setAuthNotificationFlag(true);
  return {
    type: DISMISS_AUTH_NOTIFICATION,
  };
};

export const signIn = provider => async dispatch => {
  if (provider === 'twitter') {
    await signInWithTwitter();
  } else if (provider === 'google') {
    await signInWithGoogle();
  } else {
    throw new Error('unknown provider');
  }
  setAuthNotificationFlag(true);
  dispatch({
    type: SIGN_IN,
  });
};

export const signOut = () => async dispatch => {
  await firebaseSignOut();
  setAuthNotificationFlag('');
  dispatch({
    type: SIGN_OUT,
  });
};
