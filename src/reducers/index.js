import * as actions from '../actions';

const positions = (state = [], action) => {
  switch (action.type) {
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

export const reducers = {
  positions,
  selected,
};
