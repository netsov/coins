import * as items from './items';

import { openEditor, closeEditor } from './editor';
import { toggleSelected, toggleSelectAll } from './selected';

export const GET_ITEMS_REQUEST = 'GET_POSITIONS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_POSITIONS_SUCCESS';

export const UPDATE_ITEM_REQUEST = 'UPDATE_POSITION_REQUEST';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_POSITION_SUCCESS';

export const DELETE_ITEMS_REQUEST = 'DELETE_POSITIONS_REQUEST';
export const DELETE_ITEMS_SUCCESS = 'DELETE_POSITIONS_SUCCESS';

export const OPEN_EDITOR = 'OPEN_POSITION_EDITOR';
export const CLOSE_EDITOR = 'CLOSE_POSITION_EDITOR';

export const TOGGLE_SELECTED = 'TOGGLE_SELECTED_POSITIONS';
export const CLEAR_SELECTED = 'CLEAR_SELECTED_POSITIONS';

export const getPositions = items.getItems(
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  'positions'
);
export const updatePosition = items.updateItem(
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  'positions'
);
export const deletePositions = items.deleteItems(
  DELETE_ITEMS_REQUEST,
  DELETE_ITEMS_SUCCESS,
  'positions'
);
export const openPositionEditor = openEditor(OPEN_EDITOR, 'positions');
export const closePositionEditor = closeEditor(CLOSE_EDITOR);
export const toggleSelectedPositions = toggleSelected(TOGGLE_SELECTED);
export const toggleSelectAlldPositions = toggleSelectAll(
  CLEAR_SELECTED,
  TOGGLE_SELECTED,
  'positions'
);
