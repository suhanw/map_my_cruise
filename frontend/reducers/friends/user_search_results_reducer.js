import {
  RECEIVE_USER_SEARCH_RESULTS,
  CLEAR_RESULTS,
  RECEIVE_USER_SEARCH_ERRORS
} from '../../actions/user_search_actions';
import {CLEAR_ENTITIES} from '../../actions/clear_actions';

const defaultState = [];

const UserSearchResultsReducer = (state=defaultState, action) => {
  switch (action.type) {
    case RECEIVE_USER_SEARCH_RESULTS:
      // not merging with state because we will
      // always override previous results with
      // new search terms.
      return action.payload.userSearchResults;

    case RECEIVE_USER_SEARCH_ERRORS:
      return [];

    case CLEAR_RESULTS:
      return [];

    case CLEAR_ENTITIES:
      return [];
    default:
      return state;
  }
};

export default UserSearchResultsReducer;
