import {RECEIVE_USER, RECEIVE_SESSION_ERRORS} from '../../actions/session_actions';
import {CLEAR_ERRORS} from '../../actions/clear_actions';

const defaultState = [];

const SessionErrorsReducer = (state=defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {

    case RECEIVE_SESSION_ERRORS:
      return action.errors;

    case RECEIVE_USER:
      return [];

    case CLEAR_ERRORS:
      return [];

    default:
      return state;
  }
};

export default SessionErrorsReducer;
