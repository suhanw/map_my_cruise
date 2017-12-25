export const createLike = (likableType, likableId) => {
  return $.ajax({
    url: `api/${likableType}/${likableId}/likes`,
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
