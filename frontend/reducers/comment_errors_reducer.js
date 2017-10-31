import {
  RECEIVE_COMMENT,
  REMOVE_COMMENT,
  RECEIVE_COMMENT_ERRORS,
} from '../actions/comments_actions';
import {CLEAR_ERRORS} from '../actions/clear_actions';

const defaultState = [];

const CommentErrorsReducer = (state=defaultState, action)=>{
  Object.freeze(state);
  switch (action.type) {

    case RECEIVE_COMMENT_ERRORS:
      return action.errors;

    case RECEIVE_COMMENT:
      return [];

    case CLEAR_ERRORS:
      return [];

    default:
      return state;
  }
};

export default CommentErrorsReducer;
