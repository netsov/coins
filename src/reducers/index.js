import * as actions from '../actions';

const positions = (state = [], action) => {
  switch (action.type) {
    case actions.DELETE_POSITIONS:
      return state.filter(p => !action.positionIds.includes(p.__id));
    case actions.GET_POSITIONS:
      return action.positions;
    case actions.CREATE_POSITION:
      return [action.position, ...state];
    case actions.UPDATE_POSITION:
      return state.map(
        p => (p.__id === action.position.__id ? action.position : p)
      );
    default:
      return state;
  }
};

const selected = (state = [], action) => {
  switch (action.type) {
    case actions.DELETE_POSITIONS:
    case actions.OPEN_EDITOR:
    case actions.CLEAR_SELECTED:
      return [];
    // case actions.SELECT_ALL:
    //   return state.length ===
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
    case actions.UPDATE_POSITION:
      return null;
    default:
      return state;
  }
};

const showSettings = (state = false, action) => {
  switch (action.type) {
    case actions.OPEN_SETTINGS:
      return true;
    case actions.CLOSE_SETTINGS:
      return false;
    default:
      return state;
  }
};

const settings = (state = {}, action) => {
  switch (action.type) {
    case actions.GET_SETTINGS:
      return action.settings;
    case actions.UPDATE_SETTINGS:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

export const reducers = {
  positions,
  position,
  selected,
  settings,
  showSettings,
};
