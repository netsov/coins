import * as storage from '../utils/localStorage';

export const GET_ITEMS = 'GET_POSITIONS';
export const UPDATE_ITEM = 'UPDATE_POSITION';
export const DELETE_ITEMS = 'DELETE_POSITIONS';

export const getItems = () => {
  return {
    type: GET_ITEMS,
    items: storage.getItems('positions'),
  };
};

export const updateItem = item => {
  storage.updateItem('positions')(item);
  return {
    type: UPDATE_ITEM,
    item,
  };
};

export const deleteItems = () => (dispatch, getState) => {
  const { selected: ids } = getState();
  storage.deleteItems('positions')(ids);
  dispatch({
    type: DELETE_ITEMS,
    ids,
  });
};
