import * as CommentApiUtil from '../util/comments_api_util';
import {commentNormalizer} from '../util/normalizer';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';

export const receiveComment = (comment) => {
  let normalizedPayload = commentNormalizer(comment);
  return {
    type: RECEIVE_COMMENT,
    payload: normalizedPayload,
  };
};

export const removeComment = (commentId) => {
  return {
    type: REMOVE_COMMENT,
    commentId
  };
};

export const receiveCommentErrors = (errors) => {
  return {
    type: RECEIVE_COMMENT_ERRORS,
    errors,
  };
};

export const createComment = (comment) => {
  return (dispatch) => {
    return CommentApiUtil.createComment(comment).then(
      (newComment) => dispatch(receiveComment(newComment)),
      (errors) => dispatch(receiveCommentErrors(errors.responseJSON))
    );
  };
};

export const deleteComment = (commentId) => {
  return (dispatch) => {
    return CommentApiUtil.deleteComment(commentId).then(
      (deletedComment) => dispatch(removeComment(deletedComment.id)),
      (errors) => dispatch(receiveCommentErrors(errors.responseJSON))
    );
  };
};
