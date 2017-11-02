import {
  RECEIVE_USER_SEARCH_ERRORS,
  RECEIVE_USER_SEARCH_RESULTS,
} from '../actions/user_search_actions';
import {CLEAR_ERRORS} from '../actions/clear_actions';

const defaultState = [];

const UserSearchErrorsReducer = (state=defaultState, action)=>{
  Object.freeze(state);
  switch (action.type) {

    case RECEIVE_USER_SEARCH_ERRORS:
      return action.errors;

    case RECEIVE_USER_SEARCH_RESULTS:
      return [];

    case CLEAR_ERRORS:
      return [];

    default:
      return state;
  }
};

export default UserSearchErrorsReducer;
