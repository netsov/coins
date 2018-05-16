import * as items from './items';

import { openEditor, closeEditor } from './editor';
import { toggleSelected, toggleSelectAll } from './selected';

export const GET_ITEMS_REQUEST = 'GET_WATCHLIST_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_WATCHLIST_ITEMS_SUCCESS';

export const UPDATE_ITEM_REQUEST = 'UPDATE_WATCHLIST_ITEM_REQUEST';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_WATCHLIST_ITEM_SUCCESS';

export const DELETE_ITEMS_REQUEST = 'DELETE_WATCHLIST_ITEMS_REQUEST';
export const DELETE_ITEMS_SUCCESS = 'DELETE_WATCHLIST_ITEMS_SUCCESS';

export const OPEN_EDITOR = 'OPEN_WATCHLIST_ITEM_EDITOR';
export const CLOSE_EDITOR = 'CLOSE_WATCHLIST_ITEM_EDITOR';

export const TOGGLE_SELECTED = 'TOGGLE_SELECTED_WATCHLIST_ITEMS';
export const CLEAR_SELECTED = 'CLEAR_SELECTED_WATCHLIST_ITEMS';

export const getWatchlistItems = items.getItems(
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  'watchlist'
);
export const updateWatchlistItem = items.updateItem(
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  'watchlist'
);
export const deleteWatchlistItems = items.deleteItems(
  DELETE_ITEMS_REQUEST,
  DELETE_ITEMS_SUCCESS,
  'watchlist'
);
export const openWatchlistItemEditor = openEditor(OPEN_EDITOR, 'watchlist');
export const closeWatchlistItemEditor = closeEditor(CLOSE_EDITOR);
export const toggleSelectedWatchlistItems = toggleSelected(TOGGLE_SELECTED);
export const toggleSelectAlldWatchlistItems = toggleSelectAll(
  CLEAR_SELECTED,
  TOGGLE_SELECTED,
  'watchlist'
);
