import { setAuthNotificationFlag } from '../utils/localStorage';
import {
  firebaseSignOut,
  signInWithGoogle,
  signInWithTwitter,
  signInWithGithub,
  importFirebase,
} from '../utils/firebase';

import { getPositions } from './positions';
import { getWatchlistItems } from './watchlist';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const DISMISS_AUTH_NOTIFICATION = 'DISMISS_AUTH_NOTIFICATION';

export const getUserAndItems = () => async dispatch => {
  dispatch({
    type: FETCH_USER_REQUEST,
  });

  const firebase = await importFirebase();

  firebase.auth().onAuthStateChanged(function(user) {
    dispatch({
      type: FETCH_USER_SUCCESS,
      user,
    });

    dispatch(getPositions());
    dispatch(getWatchlistItems());
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
  } else if (provider === 'github') {
    await signInWithGithub();
    // } else if (provider === 'facebook') {
    //   await signInWithFacebook();
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
