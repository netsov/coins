import { combineReducers } from 'redux';
import { getAuthNotificationFlag } from '../utils/localStorage';
import * as actions from '../actions';

const user = (state = null, action) => {
  switch (action.type) {
    case actions.FETCH_USER_SUCCESS:
      return action.user;
    default:
      return state;
  }
};

const fetching = (state = false, action) => {
  switch (action.type) {
    case actions.FETCH_USER_REQUEST:
      return true;
    case actions.FETCH_USER_SUCCESS:
      return false;
    default:
      return state;
  }
};

const authNotificationFlag = () => {
  return getAuthNotificationFlag();
};

export default combineReducers({
  user,
  fetching,
  authNotificationFlag,
});
