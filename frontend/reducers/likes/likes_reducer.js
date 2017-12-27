import merge from 'lodash/merge';
import {RECEIVE_WORKOUT} from '../../actions/workouts_actions';
import {RECEIVE_ROUTE} from '../../actions/routes_actions';
import {
  RECEIVE_LIKE,
  REMOVE_LIKE
} from '../../actions/likes_actions';
import {CLEAR_ENTITIES} from '../../actions/clear_actions';

const defaultState = {};

const LikesReducer = (state=defaultState, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_WORKOUT:
      return merge({}, state, action.payload.likes);
    case RECEIVE_ROUTE:
      return merge({}, state, action.payload.likes);
    case RECEIVE_LIKE:
      return merge({}, state, action.payload.likes);
    case REMOVE_LIKE:
      newState = merge({}, state);
      delete newState[action.likeId];
      return newState;
    default:
      return state;
  }
};

export default LikesReducer;
