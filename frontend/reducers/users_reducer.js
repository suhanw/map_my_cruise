import {
  RECEIVE_ROUTES,
  RECEIVE_ROUTE,
} from '../actions/routes_actions';
import {RECEIVE_WORKOUT} from '../actions/workouts_actions';
import {CLEAR_ENTITIES} from '../actions/clear_actions';

const defaultState = {};

const UsersReducer = (state=defaultState, {type, payload}) => {
  let newState;
  switch (type) {
    case RECEIVE_ROUTE:
      return Object.assign({}, state, {[payload.user.id]: payload.user});
    case RECEIVE_WORKOUT:
      return Object.assign({}, state, {[payload.user.id]: payload.user});
    default:
      return state;
  }
};

export default UsersReducer;
