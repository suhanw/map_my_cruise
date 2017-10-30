import {
  RECEIVE_ROUTES,
  RECEIVE_ROUTE,
  REMOVE_ROUTE,
  RECEIVE_ROUTE_ERRORS,
} from '../actions/routes_actions';
import {CLEAR_ENTITIES} from '../actions/clear_actions';

const defaultState = {};

const RoutesReducer = (state=defaultState, action) => {
  let newState;
  switch (action.type) {

    case RECEIVE_ROUTES:
      return Object.assign({}, state, action.routes);

    case RECEIVE_ROUTE:
      return Object.assign({}, state, {[action.payload.route.id]: action.payload.route});

    case REMOVE_ROUTE:
      newState = Object.assign({}, state);
      delete newState[action.route.id];
      return newState;

    case CLEAR_ENTITIES:
      return {};

    default:
      return state;
  }
};

export default RoutesReducer;
