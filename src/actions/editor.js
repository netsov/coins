import { defaultPosition } from '../models';

import * as storage from '../utils/localStorage';

export const OPEN_EDITOR = 'OPEN_EDITOR';
export const CLOSE_EDITOR = 'CLOSE_EDITOR';

export const openEditor = () => (dispatch, getState) => {
  const { selected } = getState();
  const positionId = selected.length === 1 && selected[0];

  const position = positionId
    ? storage.getItem('positions')(positionId)
    : defaultPosition;
  dispatch({
    type: OPEN_EDITOR,
    position,
  });
};

export const closeEditor = () => {
  return {
    type: CLOSE_EDITOR,
  };
};
