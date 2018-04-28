import { combineReducers } from 'redux';

import * as watchlistModule from '../actions/watchlist';
import {
  itemsReducerCreator,
  selectedReducerCreator,
  formItemReducerCreator,
} from './common';

export default combineReducers({
  selected: selectedReducerCreator(watchlistModule),
  formItem: formItemReducerCreator(watchlistModule),
  items: itemsReducerCreator(watchlistModule),
});
