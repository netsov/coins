import * as actions from '../actions';

const positions = (state = [], action) => {
  switch (action.type) {
    case actions.DELETE_POSITIONS:
    case actions.GET_STORED_POSITIONS:
      return action.positions;
    case actions.STORE_POSITION:
      return action.positions;
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
    case actions.TOGGLE_SELECTED:
      const filtered = state.filter(
        positionId => positionId !== action.positionId
      );
      return filtered.length === state.length
        ? [action.positionId, ...filtered]
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
    case actions.STORE_POSITION:
      return null;
    default:
      return state;
  }
};

export const reducers = {
  positions,
  position,
  selected,
};
