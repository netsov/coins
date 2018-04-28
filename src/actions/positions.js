import * as items from './items';

import { openEditor, closeEditor } from './editor';
import { toggleSelected, toggleSelectAll } from './selected';

export const GET_ITEMS = 'GET_POSITIONS';
export const UPDATE_ITEM = 'UPDATE_POSITION';
export const DELETE_ITEMS = 'DELETE_POSITIONS';

export const OPEN_EDITOR = 'OPEN_POSITION_EDITOR';
export const CLOSE_EDITOR = 'CLOSE_POSITION_EDITOR';

export const TOGGLE_SELECTED = 'TOGGLE_SELECTED_POSITIONS';
export const CLEAR_SELECTED = 'CLEAR_SELECTED_POSITIONS';

export const getPositions = items.getItems(GET_ITEMS, 'positions');
export const updatePosition = items.updateItem(UPDATE_ITEM, 'positions');
export const deletePositions = items.deleteItems(DELETE_ITEMS, 'positions');
export const openPositionEditor = openEditor(OPEN_EDITOR, 'positions');
export const closePositionEditor = closeEditor(CLOSE_EDITOR);
export const toggleSelectedPositions = toggleSelected(TOGGLE_SELECTED);
export const toggleSelectAlldPositions = toggleSelectAll(
  CLEAR_SELECTED,
  TOGGLE_SELECTED,
  'positions'
);
