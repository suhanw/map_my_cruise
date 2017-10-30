import merge from 'lodash/merge';
import {
  RECEIVE_ROUTES,
  RECEIVE_ROUTE,
  REMOVE_ROUTE,
  RECEIVE_ROUTE_ERRORS,
} from '../actions/routes_actions';
import {RECEIVE_WORKOUTS, RECEIVE_WORKOUT} from '../actions/workouts_actions';
import {CLEAR_ENTITIES} from '../actions/clear_actions';
import {workoutNormalizer, workoutsNormalizer} from '../util/normalizer';

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

    case RECEIVE_WORKOUTS:
      const normalizedWorkouts = workoutsNormalizer(action.payload.workouts_by_id);
      newState = merge({}, state, {routes_by_id: normalizedWorkouts.routes_by_id});
      return newState;

    case RECEIVE_WORKOUT:
      const normalizedWorkout = workoutNormalizer(action.payload.workout);
      newState = merge({}, state, {routes_by_id: normalizedWorkout.routes_by_id});
      debugger
      return newState;

    case CLEAR_ENTITIES:
      return {};

    default:
      return state;
  }
};

export default RoutesReducer;
