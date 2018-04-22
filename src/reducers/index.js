import * as actions from '../actions';
import * as positionsModule from '../actions/positions';
import * as watchlistModule from '../actions/watchlist';


const itemsReducerFactory = module => (state = [], action) => {
  switch (action.type) {
    case module.DELETE_ITEMS:
      return state.filter(p => !action.ids.includes(p.__id));
    case module.GET_ITEMS:
      return action.items;
    case module.UPDATE_ITEM:
      const isNew = !state.find(p => p.__id === action.item.__id);
      return isNew
        ? [action.item, ...state]
        : state.map(p => (p.__id === action.item.__id ? action.item : p));
    case actions.GET_HISTO_REQUEST:
      return state.map(
        p => (p.__id === action.__id ? { ...p, loading: true } : p)
      );
    case actions.GET_HISTO_SUCCESS:
      return state.map(
        p => (p.__id === action.__id ? { ...p, loading: false } : p)
      );
    case actions.GET_TICKER:
      const tickerById = action.data.reduce(
        (acc, next) => ({ ...acc, [next.id]: next }),
        {}
      );
      return state.map(item => ({ ...item, __meta: tickerById[item.__id] }));

    default:
      return state;
  }
};

const selected = (state = [], action) => {
  switch (action.type) {
    case actions.DELETE_ITEMS:
    case actions.CLOSE_EDITOR:
    case actions.CLEAR_SELECTED:
      return [];
    case actions.TOGGLE_SELECTED:
      const filtered = state.filter(
        positionId => !action.positionIds.includes(positionId)
      );
      return filtered.length === state.length
        ? [...action.positionIds, ...filtered]
        : filtered;
    default:
      return state;
  }
};

const position = (state = null, action) => {
  switch (action.type) {
    case actions.OPEN_EDITOR:
      return action.position;
    case actions.CLOSE_EDITOR:
    case actions.UPDATE_ITEM:
      return null;
    default:
      return state;
  }
};

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

const timestamp = (state = null, action) => {
  switch (action.type) {
    case actions.GET_TICKER:
      return action.timestamp;
    default:
      return state;
  }
};

export const reducers = {
  positions: itemsReducerFactory(positionsModule),
  watchlist: itemsReducerFactory(watchlistModule),
  position,
  selected,
  histo,
  ticker,
  timestamp,
};
