import {
  RECEIVE_ROUTES,
  RECEIVE_ROUTE,
  REMOVE_ROUTE,
  RECEIVE_ROUTE_ERRORS,
} from '../actions/routes_actions';
import {CLEAR_ENTITIES} from '../actions/clear_actions';
import merge from 'lodash/merge';

const defaultState = {
  routes_by_id: {},
  ordered_ids: [],
};

const RoutesReducer = (state=defaultState, action) => {
  let newState;
  switch (action.type) {

    case RECEIVE_ROUTES:
      newState = merge({}, state, action.payload);
      return newState;

    case RECEIVE_ROUTE:
      return merge({}, state, {
        routes_by_id: {[action.payload.route.id]: action.payload.route},
      });

    case REMOVE_ROUTE:
      newState = merge({}, state);
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
