import merge from 'lodash/merge';
import * as WorkoutApiUtil from '../util/workouts_api_util';
import {workoutNormalizer, workoutsNormalizer} from '../util/normalizer';

export const RECEIVE_WORKOUTS = 'RECEIVE_WORKOUTS';
export const RECEIVE_WORKOUT = 'RECEIVE_WORKOUT';
export const REMOVE_WORKOUT = 'REMOVE_WORKOUT';
export const RECEIVE_WORKOUT_ERRORS = 'RECEIVE_WORKOUT_ERRORS';

export const receiveWorkouts = (payload) => {
  let normalizedPayload = workoutsNormalizer(payload.workouts_by_id);
  normalizedPayload = merge(
    normalizedPayload,
    {ordered_ids: payload.ordered_ids}
  );
  return {
    type: RECEIVE_WORKOUTS,
    payload: normalizedPayload
  };
};

export const receiveWorkout = (payload) => {
  let normalizedPayload = workoutNormalizer(payload.workout);
  normalizedPayload = merge(normalizedPayload, {user: payload.user});
  return {
    type: RECEIVE_WORKOUT,
    payload: normalizedPayload,
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
