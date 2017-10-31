import {
  RECEIVE_ROUTES,
  RECEIVE_ROUTE,
} from '../actions/routes_actions';
import {RECEIVE_WORKOUT, RECEIVE_WORKOUTS} from '../actions/workouts_actions';
import {CLEAR_ENTITIES} from '../actions/clear_actions';

const defaultState = {};

const UsersReducer = (state=defaultState, {type, payload}) => {
  let newState;
  switch (type) {
    case RECEIVE_ROUTE:
      return Object.assign({}, state, payload.users);
    case RECEIVE_ROUTES:
      return Object.assign({}, state, payload.users);
    case RECEIVE_WORKOUT:
      return Object.assign({}, state, payload.users);
    case RECEIVE_WORKOUTS:
      return Object.assign({}, state, payload.users);
    default:
      return state;
  }
};

export default UsersReducer;
