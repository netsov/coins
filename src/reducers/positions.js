import { combineReducers } from 'redux';

import * as positionsModule from '../actions/positions';
import {
  itemsReducerCreator,
  selectedReducerCreator,
  formItemReducerCreator,
  fetchingReducerCreator,
  updatingReducerCreator,
  deletingReducerCreator
} from './common';

export default combineReducers({
  selected: selectedReducerCreator(positionsModule),
  formItem: formItemReducerCreator(positionsModule),
  items: itemsReducerCreator(positionsModule),
  fetching: fetchingReducerCreator(positionsModule),
  updating: updatingReducerCreator(positionsModule),
  deleting: deletingReducerCreator(positionsModule),
});
