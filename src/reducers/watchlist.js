import { combineReducers } from 'redux';

import * as watchlistModule from '../actions/watchlist';
import {
  itemsReducerCreator,
  selectedReducerCreator,
  formItemReducerCreator,
  fetchingReducerCreator,
  deletingReducerCreator,
  updatingReducerCreator,
} from './common';

export default combineReducers({
  selected: selectedReducerCreator(watchlistModule),
  formItem: formItemReducerCreator(watchlistModule),
  items: itemsReducerCreator(watchlistModule),
  fetching: fetchingReducerCreator(watchlistModule),
  updating: updatingReducerCreator(watchlistModule),
  deleting: deletingReducerCreator(watchlistModule),
});
