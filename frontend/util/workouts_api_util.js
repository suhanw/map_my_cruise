export const fetchWorkouts = () => {
  return $.ajax({
    url:'api/workouts/',
    method: 'get',
  });
};

export const fetchWorkout = (workoutId) => {
  return $.ajax({
    url:`api/workouts/${workoutId}`,
    method:'get'
  });
};

export const createWorkout = (workout) => {
  return $.ajax({
    url: 'api/workouts',
    method: 'post',
    data: {workout}
  });
};

export const updateWorkout = (workout) => {
  return $.ajax({
    url: `api/workouts/${workout.id}`,
    method: 'patch',
    data: {workout}
  });
};

export const deleteWorkout = (workoutId) => {
  return $.ajax({
    url: `api/workouts/${workoutId}`,
    method: 'delete',
  });
};
