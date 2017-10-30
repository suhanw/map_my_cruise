import {
  RECEIVE_WORKOUTS,
  RECEIVE_WORKOUT,
  REMOVE_WORKOUT,
  RECEIVE_WORKOUT_ERRORS,
} from '../actions/workouts_actions';
import {CLEAR_ENTITIES} from '../actions/clear_actions';

const defaultState = {
  workouts_by_id: {},
  ordered_ids: [],
};

const WorkoutsReducer = (state=defaultState, action) => {
  let newState;
  switch (action.type) {

    case RECEIVE_WORKOUTS:
      newState = Object.assign({}, state, action.payload);
      return newState;

    case RECEIVE_WORKOUT:
      return Object.assign({}, state, {
        workouts_by_id: {[action.payload.workout.id]: action.payload.workout},
      });

    case REMOVE_WORKOUT:
      newState = Object.assign({}, state);
      const rmId = newState.ordered_ids.indexOf(action.payload.workout.id);
      delete newState.workouts_by_id[action.payload.workout.id];
      newState.ordered_ids.splice(rmId, 1);
      return newState;

    case CLEAR_ENTITIES:
      return {};

    default:
      return state;
  }
};

export default WorkoutsReducer;
