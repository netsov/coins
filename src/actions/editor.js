import { defaultPosition } from '../models';

import * as storage from '../utils/localStorage';

export const OPEN_EDITOR = 'OPEN_EDITOR';
export const CLOSE_EDITOR = 'CLOSE_EDITOR';

export const openEditor = reducerName => () => (dispatch, getState) => {
  const { selected } = getState();
  const itemId = selected.length === 1 && selected[0];

  const item = itemId
    ? storage.getItem(reducerName)(itemId)
    : defaultPosition;
  dispatch({
    type: OPEN_EDITOR,
    item,
  });
};

export const closeEditor = () => {
  return {
    type: CLOSE_EDITOR,
  };
};
