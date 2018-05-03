import * as storage from '../utils/localStorage';
import { firebaseDB } from '../utils/firebase';

export const getItems = (type, reducerName) => () => async (
  dispatch,
  getState
) => {
  let items;
  const { user } = getState();

  if (user) {
    const snapshot = await firebaseDB
      .ref(`${user.uid}/${reducerName}`)
      .once('value');
    const itemsById = snapshot.val();
    items = itemsById ? Object.values(snapshot.val()) : [];
  } else {
    items = storage.getItems(reducerName);
  }

  dispatch({
    type,
    items,
  });
};

export const updateItem = (type, reducerName) => item => async (
  dispatch,
  getState
) => {
  const { user } = getState();

  if (user) {
    await firebaseDB
      .ref(`${user.uid}/${reducerName}`)
      .update({ [item.__id]: item });
  } else {
    storage.updateItem(reducerName)(item);
  }

  dispatch({
    type,
    item,
  });
};

export const deleteItems = (type, reducerName) => () => async (
  dispatch,
  getState
) => {
  const { [reducerName]: { selected: ids }, user } = getState();

  if (user) {
    await firebaseDB
      .ref(`${user.uid}/${reducerName}`)
      .update(ids.reduce((acc, next) => ({ ...acc, [next]: null }), {}));
  } else {
    storage.deleteItems(reducerName)(ids);
  }

  dispatch({
    type,
    ids,
  });
};
