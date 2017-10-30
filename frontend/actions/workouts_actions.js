import * as WorkoutApiUtil from '../util/workouts_api_util';

export const RECEIVE_WORKOUTS = 'RECEIVE_WORKOUTS';
export const RECEIVE_WORKOUT = 'RECEIVE_WORKOUT';
export const REMOVE_WORKOUT = 'REMOVE_WORKOUT';
export const RECEIVE_WORKOUT_ERRORS = 'RECEIVE_WORKOUT_ERRORS';

export const receiveWorkouts = (payload) => {
  return {
    type: RECEIVE_WORKOUTS,
    payload
  };
};

export const receiveWorkout = (payload) => {
  return {
    type: RECEIVE_WORKOUT,
    payload
  };
};

export const removeWorkout = (payload) => {
  return {
    type: REMOVE_WORKOUT,
    payload
  };
};

export const receiveWorkoutErrors = (errors) => {
  return {
    type: RECEIVE_WORKOUT_ERRORS,
    errors
  };
};

export const fetchWorkouts = () => {
  return (dispatch) => {
    return WorkoutApiUtil.fetchWorkouts().then(
      (payload) => dispatch(receiveWorkouts(payload)),
      (errors) => dispatch(receiveWorkoutErrors(errors.responseJSON))
    );
  };
};

export const fetchWorkout = (workoutId) => {
  return (dispatch) => {
    return WorkoutApiUtil.fetchWorkout(workoutId).then(
      (payload) => dispatch(receiveWorkout(payload)),
      (errors) => dispatch(receiveWorkoutErrors(errors.responseJSON))
    );
  };
};

export const createWorkout = (workout) => {
  return (dispatch) => {
    return WorkoutApiUtil.createWorkout(workout).then(
      (newWorkout) => dispatch(receiveWorkout(newWorkout)),
      (errors) => dispatch(receiveWorkoutErrors(errors.responseJSON))
    );
  };
};

export const updateWorkout = (workout) => {
  return (dispatch) => {
    return WorkoutApiUtil.updateWorkout(workout).then(
      (updatedWorkout) => dispatch(receiveWorkout(updatedWorkout)),
      (errors) => dispatch(receiveWorkoutErrors(errors.responseJSON))
    );
  };
};

export const deleteWorkout = (workoutId) => {
  return (dispatch) => {
    return WorkoutApiUtil.deleteWorkout(workoutId).then(
      (deletedWorkout) => dispatch(removeWorkout(deletedWorkout)),
      (errors) => dispatch(receiveWorkoutErrors(errors.responseJSON))
    );
  };
};
