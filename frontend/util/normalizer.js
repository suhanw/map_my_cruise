import {normalize, schema} from 'normalizr';
import merge from 'lodash/merge';

export const workoutNormalizer = (oldWorkout) => {
  const route = new schema.Entity('routes_by_id');
  const workout = new schema.Entity('workouts_by_id', {
    route: route,
  });
  const normalizedPayload = normalize(oldWorkout, workout);
  return normalizedPayload.entities;
};

export const workoutsNormalizer = (workouts) => {
  const entities = {};
  for (let key in workouts) {
    merge(entities, workoutNormalizer(workouts[key]));
  }
  return entities;
};
