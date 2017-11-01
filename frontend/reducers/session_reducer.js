import merge from 'lodash/merge';
import {RECEIVE_USER} from '../actions/session_actions';
import {
  RECEIVE_FRIEND_STATUSES,
  RECEIVE_FRIEND_STATUS,
  REMOVE_FRIEND_STATUS
} from '../actions/friends_actions';

const defaultState = {
  currentUser: null,
};

const SessionReducer = (state = defaultState, action) => {
  let newState;
  let friendsArr;

  switch (action.type) {
    case RECEIVE_USER:
      newState = Object.assign({}, state, {currentUser: action.user});
      return newState;

    case RECEIVE_FRIEND_STATUSES:
      friendsArr = Object.keys(action.payload.friends);
      newState = merge({}, state, {
        currentUser: {
          friends: friendsArr
        }
      });
      return newState;

    case RECEIVE_FRIEND_STATUS:
      newState = Object.assign({}, state);
      if (!newState.currentUser.friends) { newState.currentUser.friends = []; }
      friendsArr = Object.keys(action.payload.friends);
      newState.currentUser.friends = newState.currentUser.friends.concat(friendsArr);
      return newState;

    case REMOVE_FRIEND_STATUS:
      newState = Object.assign({}, state);
      const i = newState.currentUser.friends.indexOf(action.friendStatusId);
      newState.currentUser.friends.splice(i, 1);
      return newState;

    default:
      return state;
  }
};

export default SessionReducer;
