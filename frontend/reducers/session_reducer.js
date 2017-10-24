import {RECEIVE_USER} from '../actions/session_actions';

const defaultState = {
  currentUser: null,
};

const SessionReducer = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_USER:
      newState = Object.assign({}, state, {currentUser: action.user});
      return newState;
    default:
      return state;
  }
};

export default SessionReducer;
