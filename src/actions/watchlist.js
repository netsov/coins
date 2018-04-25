import * as items from './items';

export const GET_ITEMS = 'GET_WATCHLIST_ITEMS';
export const UPDATE_ITEM = 'UPDATE_WATCHLIST_ITEM';
export const DELETE_ITEMS = 'DELETE_WATCHLIST_ITEMS';

export const getWatchlistItems = items.getItems(GET_ITEMS, 'watchlist');

export const updateWatchlistItem = items.updateItem(UPDATE_ITEM, 'watchlist');

export const deleteWatchlistItems = items.deleteItems(
  DELETE_ITEMS,
  'watchlist'
);
