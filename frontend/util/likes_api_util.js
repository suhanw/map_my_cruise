export const createLike = (workoutId) => {
  return $.ajax({
    url: `api/workouts/${workoutId}/likes`,
    method: 'post',
  });
};

export const deleteLike = (likeId) => {
  return $.ajax({
    url: `api/likes/${likeId}`,
    method: 'delete',
  });
};

export const fetchLike = (likeId) => {
  return $.ajax({
    url:`api/likes/${likeId}`,
    method: 'get',
  });
};
