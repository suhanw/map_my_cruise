import {RECEIVE_LIKE_ERRORS, RECEIVE_LIKE} from '../../actions/likes_actions';
import {CLEAR_ERRORS} from '../../actions/clear_actions';

const defaultState = [];

const LikeErrorsReducer = (state=defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LIKE_ERRORS:
      return action.errors;
    case RECEIVE_LIKE:
      return [];
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};

export default LikeErrorsReducer;
