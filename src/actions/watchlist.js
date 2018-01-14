import * as storage from '../utils/localStorage';

export const GET_ITEMS = 'GET_WATCHLIST';
export const UPDATE_ITEM = 'UPDATE_WATCHLIST';
export const DELETE_ITEMS = 'DELETE_WATCHLIST';

export const getItems = () => {
  return {
    type: GET_ITEMS,
    items: storage.getItems('watchlist'),
  };
};

export const updateItem = item => {
  storage.updateItem('watchlist')(item);
  return {
    type: UPDATE_ITEM,
    position: item,
  };
};

export const deleteItems = () => (dispatch, getState) => {
  const { selected: ids } = getState();
  storage.deleteItems('watchlist')(ids);
  dispatch({
    type: DELETE_ITEMS,
    ids,
  });
};
