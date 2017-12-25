import merge from 'lodash/merge';
import {RECEIVE_WORKOUT} from '../../actions/workouts_actions';
import {
  RECEIVE_COMMENT,
  REMOVE_COMMENT
} from '../../actions/comments_actions';
import {CLEAR_ENTITIES} from '../../actions/clear_actions';

const defaultState = {};

const CommentsReducer = (state=defaultState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_WORKOUT:
      return merge({}, state, action.payload.comments);
    case RECEIVE_COMMENT:
      return merge({}, state, action.payload.comments);
    case REMOVE_COMMENT:
      newState = merge({}, state);
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
};

export default CommentsReducer;
