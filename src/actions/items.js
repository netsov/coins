import * as storage from '../utils/localStorage';
import { firebaseDB } from '../utils/firebase';

export const getItems = (typeRequest, typeSuccess, reducerName) => () => async (
  dispatch,
  getState
) => {
  let items;
  const { auth : {user} } = getState();

  if (user) {
    dispatch({
      type: typeRequest,
    });
    const snapshot = await firebaseDB
      .ref(`${user.uid}/${reducerName}`)
      .once('value');
    const itemsById = snapshot.val();
    items = itemsById ? Object.values(snapshot.val()) : [];
  } else {
    items = storage.getItems(reducerName);
  }

  dispatch({
    type: typeSuccess,
    items,
  });
};

export const updateItem = (
  typeRequest,
  typeSuccess,
  reducerName
) => item => async (dispatch, getState) => {
  const { auth : {user} } = getState();

  if (user) {
    dispatch({
      type: typeRequest,
    });
    await firebaseDB
      .ref(`${user.uid}/${reducerName}`)
      .update({ [item.__id]: item });
  } else {
    storage.updateItem(reducerName)(item);
  }

  dispatch({
    type: typeSuccess,
    item,
  });
};

export const deleteItems = (
  typeRequest,
  typeSuccess,
  reducerName
) => () => async (dispatch, getState) => {
  const { [reducerName]: { selected: ids }, auth : {user} } = getState();

  if (user) {
    dispatch({
      type: typeRequest,
    });
    await firebaseDB
      .ref(`${user.uid}/${reducerName}`)
      .update(ids.reduce((acc, next) => ({ ...acc, [next]: null }), {}));
  } else {
    storage.deleteItems(reducerName)(ids);
  }

  dispatch({
    type: typeSuccess,
    ids,
  });
};
