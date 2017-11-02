import * as UserSearchApiUtil from '../util/user_search_api_util';

export const RECEIVE_USER_SEARCH_RESULTS = 'RECEIVE_USER_SEARCH_RESULTS';
export const RECEIVE_USER_SEARCH_ERRORS = 'RECEIVE_USER_SEARCH_ERRORS';
export const CLEAR_RESULTS = 'CLEAR_RESULTS';

export const receiveUserSearchResults = (payload) => {
  return {
    type: RECEIVE_USER_SEARCH_RESULTS,
    payload
  };
};

export const receiveUserSearchErrors = (errors) => {
  return {
    type: RECEIVE_USER_SEARCH_ERRORS,
    errors,
  };
};

export const clearResults = () => {
  return {
    type: CLEAR_RESULTS,
  };
};

// thunk
export const searchUsers = (searchTerm) => {
  return (dispatch) => {
    return UserSearchApiUtil.searchUsers(searchTerm).then(
      (payload) => dispatch(receiveUserSearchResults(payload)),
      (errors) => dispatch(receiveUserSearchErrors(errors.responseJSON))
    );
  };
};
