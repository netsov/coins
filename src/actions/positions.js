import * as items from './items';

export const GET_ITEMS = 'GET_POSITIONS';
export const UPDATE_ITEM = 'UPDATE_POSITION';
export const DELETE_ITEMS = 'DELETE_POSITIONS';

export const getPositions = items.getItems(GET_ITEMS, 'positions');

export const updatePosition = items.updateItem(UPDATE_ITEM, 'positions');

export const deletePositions = items.deleteItems(DELETE_ITEMS, 'positions');
