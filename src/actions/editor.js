import { defaultPosition } from '../models';

import * as storage from '../utils/localStorage';

export const openEditor = (type, reducerName) => () => (dispatch, getState) => {
  const { [reducerName]: { selected } } = getState();
  const itemId = selected.length === 1 && selected[0];

  const item = itemId ? storage.getItem(reducerName)(itemId) : defaultPosition;
  dispatch({
    type,
    item,
  });
};

export const closeEditor = type => () => {
  return {
    type,
  };
};
