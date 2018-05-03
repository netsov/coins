import * as firebase from 'firebase';

export const GET_USER = 'GET_USER';

export const getUser = () => dispatch => {
  firebase.auth().onAuthStateChanged(function(user) {
    dispatch({
      type: GET_USER,
      user,
    });
  });
};
