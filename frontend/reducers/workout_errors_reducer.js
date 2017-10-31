import {
  RECEIVE_WORKOUTS,
  RECEIVE_WORKOUT,
  REMOVE_WORKOUT,
  RECEIVE_WORKOUT_ERRORS,
} from '../actions/workouts_actions';
import {CLEAR_ERRORS} from '../actions/clear_actions';



const defaultState = [];

const WorkoutErrorsReducer = (state=defaultState, action)=>{
  Object.freeze(state);
  switch (action.type) {

    case RECEIVE_WORKOUT_ERRORS:
      return action.errors;

    case RECEIVE_WORKOUT:
      return [];

    case CLEAR_ERRORS:
      return [];

    default:
      return state;
  }
};

export default WorkoutErrorsReducer;
