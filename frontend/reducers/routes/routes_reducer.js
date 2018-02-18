import merge from 'lodash/merge';
import {
  RECEIVE_ROUTES,
  RECEIVE_ROUTE,
  REMOVE_ROUTE,
  RECEIVE_ROUTE_ERRORS,
} from '../../actions/routes_actions';
import {RECEIVE_WORKOUTS, RECEIVE_WORKOUT} from '../../actions/workouts_actions';
import {CLEAR_ENTITIES} from '../../actions/clear_actions';

const defaultState = {
  routes_by_id: {},
  ordered_ids: [],
};

const RoutesReducer = (state=defaultState, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {

    case RECEIVE_ROUTES:
      // newState = merge({}, state, action.payload);
      // when we delete route, the route might still be in old state,
      // so shouldn't merge with old state...
      newState = merge({}, action.payload);
      return newState;

    case RECEIVE_ROUTE:
      newState = merge({}, state, {
        routes_by_id: action.payload.routes_by_id
      });
      // to fix the problem of merge not overwriting existing array with empty array
      let routeId = parseInt(Object.keys(action.payload.routes_by_id)[0]);
      if (newState.routes_by_id[routeId].likes) {
        newState.routes_by_id[routeId].likes = action.payload.routes_by_id[routeId].likes;
      }
      return newState;

    case REMOVE_ROUTE:
      newState = merge({}, state);
      const rmId = newState.ordered_ids.indexOf(action.payload.route.id);
      delete newState.routes_by_id[action.payload.route.id];
      newState.ordered_ids.splice(rmId, 1);
      return newState;

    case RECEIVE_WORKOUTS:
      newState = merge({}, state, {routes_by_id: action.payload.routes_by_id});
      return newState;

    case RECEIVE_WORKOUT:
      newState = merge({}, state, {routes_by_id: action.payload.routes_by_id});
      return newState;

    case CLEAR_ENTITIES:
      return {};

    default:
      return state;
  }
};

export default RoutesReducer;
