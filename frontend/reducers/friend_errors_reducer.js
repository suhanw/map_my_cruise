import {CLEAR_ERRORS} from '../actions/clear_actions';
import { RECEIVE_FRIEND_STATUS_ERRORS, RECEIVE_FRIEND_STATUS } from '../actions/friends_actions';

const defaultState = [];

const FriendErrorsReducer = (state=defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FRIEND_STATUS_ERRORS:
      return action.errors;
    case RECEIVE_FRIEND_STATUS:
      return [];
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};

export default FriendErrorsReducer;
