import merge from 'lodash/merge';
import {CLEAR_ENTITIES} from '../actions/clear_actions';
import {
  RECEIVE_FRIEND_STATUSES,
  RECEIVE_FRIEND_STATUS,
  REMOVE_FRIEND_STATUS,
  RECEIVE_FRIEND_STATUS_ERRORS
} from '../actions/friends_actions';


const defaultState = {};

const FriendsReducer = (state=defaultState, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_FRIEND_STATUSES:
      return action.payload;

    case RECEIVE_FRIEND_STATUS:
      newState = merge({}, state, {
        [action.payload.id]: action.payload,
      });
      return newState;

    case REMOVE_FRIEND_STATUS:
      newState = merge({}, state);
      delete newState[action.friendStatusId];
      return newState;

    case CLEAR_ENTITIES:
      return {};
    default:
      return state;
  }
};

export default FriendsReducer;
