import { defaultPosition } from '../models';

import * as storage from '../utils/localStorage';

export const GET_POSITIONS = 'GET_POSITIONS';
export const CREATE_POSITION = 'CREATE_POSITION';
export const UPDATE_POSITION = 'UPDATE_POSITION';
export const DELETE_POSITIONS = 'DELETE_POSITIONS';
export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';
export const CLEAR_SELECTED = 'CLEAR_SELECTED';
export const OPEN_EDITOR = 'OPEN_EDITOR';
export const CLOSE_EDITOR = 'CLOSE_EDITOR';

export const getPositions = () => {
  return {
    type: GET_POSITIONS,
    positions: storage.getPositions(),
  };
};

export const createPosition = position => {
  position.__id = new Date().valueOf();
  storage.createPosition(position);
  return {
    type: CREATE_POSITION,
    position,
  };
};

export const updatePosition = position => {
  storage.updatePosition(position);
  return {
    type: UPDATE_POSITION,
    position,
  };
};

export const deletePosition = positionIds => {
  storage.deletePositions(positionIds);
  return {
    type: DELETE_POSITIONS,
    positionIds,
  };
};

export const toggleSelected = positionId => {
  return {
    type: TOGGLE_SELECTED,
    positionId,
  };
};

export const clearSelected = () => {
  return {
    type: CLEAR_SELECTED,
  };
};

export const openEditor = positionId => {
  const position = storage.getPosition(positionId) || defaultPosition;
  return {
    type: OPEN_EDITOR,
    position,
  };
};

export const closeEditor = () => {
  return {
    type: CLOSE_EDITOR,
  };
};
