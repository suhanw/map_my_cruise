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
  let friendsArr = [];

  switch (action.type) {
    case RECEIVE_USER:
      newState = Object.assign({}, state, {currentUser: action.user});
      return newState;

    case RECEIVE_FRIEND_STATUSES:
      if (action.payload.friends) {
        // note: Object.keys return array of STRINGS, so map over to parse to int.
        friendsArr = Object.keys(action.payload.friends).map((id)=>parseInt(id));
      }
      newState = merge({}, state, {
        currentUser: {
          friends: friendsArr,
        }
      });
      return newState;

    case RECEIVE_FRIEND_STATUS:
      newState = Object.assign({}, state);
      // if current user doesn't have friends, initialize the 'friends' key with empty arr
      if (!newState.currentUser.friends) { newState.currentUser.friends = []; }
      friendsArr = Object.keys(action.payload.friends).map((id)=>parseInt(id));
      // don't add friend to 'friends' array if it's a status change from 'pending' to 'yes'
      // because it is already in the array when it was 'pending'
      if (newState.currentUser.friends.indexOf(friendsArr[0]) === -1) {
        newState.currentUser.friends = newState.currentUser.friends.concat(friendsArr);
      }
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
