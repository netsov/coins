import { combineReducers } from 'redux';

import * as positionsModule from '../actions/positions';
import {
  itemsReducerCreator,
  selectedReducerCreator,
  formItemReducerCreator,
} from './common';

export default combineReducers({
  selected: selectedReducerCreator(positionsModule),
  formItem: formItemReducerCreator(positionsModule),
  items: itemsReducerCreator(positionsModule),
});
