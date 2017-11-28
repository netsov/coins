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

export default {
  positions,
};
