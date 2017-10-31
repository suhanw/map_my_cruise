import {normalize, schema} from 'normalizr';
import merge from 'lodash/merge';

export const workoutNormalizer = (oldWorkout) => {
  const user = new schema.Entity('users');
  const route = new schema.Entity('routes_by_id', {
    user: user,
  });
  const workout = new schema.Entity('workouts_by_id', {
    user: user,
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

export const routeNormalizer = (oldRoute) => {
  const user = new schema.Entity('users');
  const route = new schema.Entity('routes_by_id', {
    user: user,
  });
  const normalizedPayload = normalize(oldRoute, route);
  return normalizedPayload.entities;
};

export const routesNormalizer = (routes) => {
  const entities = {};
  for (let key in routes) {
    merge(entities, routeNormalizer(routes[key]));
  }
  return entities;
};
