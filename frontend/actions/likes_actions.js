import * as LikeApiUtil from '../util/likes_api_util';
import {likeNormalizer} from '../util/normalizer';

export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';
export const RECEIVE_LIKE_ERRORS = 'RECEIVE_LIKE_ERRORS';

export const receiveLike = (like) => {
  let normalizedPayload = likeNormalizer(like);
  return {
    type: RECEIVE_LIKE,
    payload: normalizedPayload,
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

export const createLike = (likableType, likableId) => {
  return (dispatch) => {
    return LikeApiUtil.createLike(likableType, likableId).then(
      (newLike) => dispatch(receiveLike(newLike)),
      (errors) => dispatch(receiveLikeErrors(errors.responseJSON))
    );
  };
};

export const deleteLike = (likeId) => {
  return (dispatch) => {
    return LikeApiUtil.deleteLike(likeId).then(
      (deletedLike) => dispatch(removeLike(deletedLike.id)),
      (errors) => dispatch(receiveLikeErrors(errors.responseJSON))
    );
  };
};

export const fetchLike = (likeId) => {
  return (dispatch) => {
    return LikeApiUtil.fetchLike(likeId).then(
      (like) => dispatch(receiveLike(like)),
      (errors) => dispatch(receiveLikeErrors(errors.responseJSON))
    );
  };
};
