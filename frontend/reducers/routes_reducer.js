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
      newState = Object.assign({}, state, action.payload);
      return newState;

    case RECEIVE_ROUTE:
      return Object.assign({}, state, {[action.payload.route.id]: action.payload.route});

    case REMOVE_ROUTE:
      newState = Object.assign({}, state);
      const rmId = newState.ordered_ids.indexOf(action.payload.route.id);
      delete newState.routes_by_id[action.payload.route.id];
      newState.ordered_ids.splice(rmId, 1);
      return newState;

    case CLEAR_ENTITIES:
      return {};

    default:
      return state;
  }
};

export default RoutesReducer;
