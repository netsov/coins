import * as items from './items';

import { openEditor, closeEditor } from './editor';
import { toggleSelected, toggleSelectAll } from './selected';

export const GET_ITEMS = 'GET_WATCHLIST_ITEMS';
export const UPDATE_ITEM = 'UPDATE_WATCHLIST_ITEM';
export const DELETE_ITEMS = 'DELETE_WATCHLIST_ITEMS';

export const OPEN_EDITOR = 'OPEN_WATCHLIST_ITEM_EDITOR';
export const CLOSE_EDITOR = 'CLOSE_WATCHLIST_ITEM_EDITOR';

export const TOGGLE_SELECTED = 'TOGGLE_SELECTED_WATCHLIST_ITEMS';
export const CLEAR_SELECTED = 'CLEAR_SELECTED_WATCHLIST_ITEMS';

export const getWatchlistItems = items.getItems(GET_ITEMS, 'watchlist');
export const updateWatchlistItem = items.updateItem(UPDATE_ITEM, 'watchlist');
export const deleteWatchlistItems = items.deleteItems(
  DELETE_ITEMS,
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
