import * as LikeApiUtil from '../util/likes_api_util';

export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';
export const RECEIVE_LIKE_ERRORS = 'RECEIVE_LIKE_ERRORS';

export const receiveLike = (like) => {
  return {
    type: RECEIVE_LIKE,
    payload: like,
  };
};

export const removeLike = (likeId) => {
  return {
    type: REMOVE_LIKE,
    likeId,
  };
};

export const receiveLikeErrors = (errors) => {
  return {
    type: RECEIVE_LIKE_ERRORS,
    errors,
  };
};

export const createLike = (workoutId) => {
  return (dispatch) => {
    return LikeApiUtil.createLike(workoutId).then(
      (newLike) => dispatch(receiveLike(newLike))
    ).catch(
      (errors) => dispatch(receiveLikeErrors(errors.responseJSON))
    );
  };
};

export const deleteLike = (likeId) => {
  return (dispatch) => {
    return LikeApiUtil.deleteLike(likeId).then(
      (deletedLike) => dispatch(removeLike(deletedLike.id))
    ).catch(
      (errors) => dispatch(receiveLikeErrors(errors.responseJSON))
    );
  };
};
