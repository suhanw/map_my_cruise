import {normalize, schema} from 'normalizr';
import merge from 'lodash/merge';

export const friendNormalizer = (oldFriend) => {
  const user = new schema.Entity('users');
  const friend = new schema.Entity('friends', {
    friend: user,
  });
  const normalizedPayload = normalize(oldFriend, friend);
  return normalizedPayload.entities;
};

export const friendsNormalizer = (friends) => {
  let entities = {};
  for (let key in friends) {
    merge(entities, friendNormalizer(friends[key]));
  }
  return entities;
};

export const workoutNormalizer = (oldWorkout) => {
  const user = new schema.Entity('users');
  const route = new schema.Entity('routes_by_id', {
    user: user,
  });
  const comment = new schema.Entity('comments', {
    user: user,
  });
  const workout = new schema.Entity('workouts_by_id', {
    comments: [ comment ],
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

export const routeNormalizer = (oldComment) => {
  const user = new schema.Entity('users');
  const route = new schema.Entity('routes_by_id', {
    user: user,
  });
  const normalizedPayload = normalize(oldComment, route);
  return normalizedPayload.entities;
};

export const routesNormalizer = (routes) => {
  const entities = {};
  for (let key in routes) {
    merge(entities, routeNormalizer(routes[key]));
  }
  return entities;
};

export const commentNormalizer = (oldComment) => {
  const user = new schema.Entity('users');
  const comment = new schema.Entity('comments', {
    user: user,
  });
  const normalizedPayload = normalize(oldComment, comment);
  return normalizedPayload.entities;
};

// export const activitiesNormalize = () => {
//   const user = new schema.Entity('users');
//   const route =
// };
