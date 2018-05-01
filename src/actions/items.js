import * as storage from '../utils/localStorage';
import { firebaseDB } from '../utils/firebase';

export const getItems = (type, reducerName) => () => {
  return {
    type,
    items: storage.getItems(reducerName),
  };
};

export const updateItem = (type, reducerName) => item => {
  storage.updateItem(reducerName)(item);
  return {
    type,
    item,
  };
};

export const deleteItems = (type, reducerName) => () => (
  dispatch,
  getState
) => {
  const { [reducerName]: { selected: ids } } = getState();
  storage.deleteItems(reducerName)(ids);
  dispatch({
    type,
    ids,
  });
};
