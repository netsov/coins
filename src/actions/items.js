import * as storage from '../utils/localStorage';

export const getItems = (type, reducerName) => () => (dispatch, getState) => {
  const { ticker } = getState();

  const tickerById = ticker.reduce(
    (acc, next) => ({ ...acc, [next.id]: next }),
    {}
  );
  const items = storage
    .getItems(reducerName)
    .map(item => ({ ...item, __meta: tickerById[item.__id] || {} }));

  dispatch({
    type,
    items,
  });
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
