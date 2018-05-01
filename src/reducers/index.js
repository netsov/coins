import * as actions from '../actions';

import positions from './positions';
import watchlist from './watchlist';

const histo = (state = {}, action) => {
  switch (action.type) {
    case actions.GET_HISTO_SUCCESS:
      return { ...state, [action.key]: action.data };
    default:
      return state;
  }
};

const ticker = (state = [], action) => {
  switch (action.type) {
    case actions.GET_TICKER:
      return action.data;
    default:
      return state;
  }
};

const tickerById = (state = {}, action) => {
  switch (action.type) {
    case actions.GET_TICKER:
      return action.data.reduce(
        (acc, next) => ({ ...acc, [next.id]: next }),
        {}
      );
    default:
      return state;
  }
};

const timestamp = (state = null, action) => {
  switch (action.type) {
    case actions.GET_TICKER:
      return action.timestamp;
    default:
      return state;
  }
};

export const reducers = {
  positions,
  watchlist,
  histo,
  ticker,
  tickerById,
  timestamp,
};
