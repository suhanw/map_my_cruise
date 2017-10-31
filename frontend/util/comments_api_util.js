export const createComment = (comment) => {
  return $.ajax({
    url: `api/workouts/${comment.workout_id}/comments`,
    method: 'post',
    data: {comment},
  });
};

export const deleteComment = (commentId) => {
  return $.ajax({
    url: `api/comments/${commentId}`,
    method: 'delete',
  });
};
