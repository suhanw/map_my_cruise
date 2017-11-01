import merge from 'lodash/merge';
import * as FriendsApiUtil from '../util/friends_api_util';
// import {workoutNormalizer, workoutsNormalizer} from '../util/normalizer';


export const RECEIVE_FRIEND_STATUSES = 'RECEIVE_FRIEND_STATUSES';
export const RECEIVE_FRIEND_STATUS = 'RECEIVE_FRIEND_STATUS';
export const REMOVE_FRIEND_STATUS = 'REMOVE_FRIEND_STATUS';
export const RECEIVE_FRIEND_STATUS_ERRORS = 'RECEIVE_FRIEND_STATUS_ERRORS';

export const receiveFriendStatuses = (friendStatuses) => {
  return {
    type: RECEIVE_FRIEND_STATUSES,
    payload: friendStatuses,
  };
};

export const receiveFriendStatus = (friendStatus) => {
  return {
    type: RECEIVE_FRIEND_STATUS,
    payload: friendStatus,
  };
};

export const removeFriendStatus = (friendStatus) => {
  return {
    type: REMOVE_FRIEND_STATUS,
    friendStatusId: friendStatus.id,
  };
};

export const receiveFriendStatusErrors = (errors) => {
  return {
    type: RECEIVE_FRIEND_STATUS_ERRORS,
    errors,
  };
};

// THUNK action creators

export const fetchFriendStatuses = () => {
  return (dispatch) => {
    return FriendsApiUtil.fetchFriendStatuses().then(
      (friendStatuses) => dispatch(receiveFriendStatuses(friendStatuses)),
      (errors) => dispatch(receiveFriendStatusErrors(errors.responseJSON))
    );
  };
};

export const createFriendStatus = (friendStatus) => {
  return (dispatch) => {
    return FriendsApiUtil.createFriendStatus(friendStatus).then(
      (newFriendStatus) => dispatch(receiveFriendStatus(newFriendStatus)),
      (errors) => dispatch(receiveFriendStatusErrors(errors.responseJSON))
    );
  };
};

export const updateFriendStatus = (friendStatus) => {
  return (dispatch) => {
    return FriendsApiUtil.updateFriendStatus(friendStatus).then(
      (updatedFriendStatus) => {
        debugger
        // conditional to dispatch action based on acceptance/rejection of friend request
        if (updatedFriendStatus.friend_status === 'yes') {
          dispatch(receiveFriendStatus(updatedFriendStatus));
        } else {
          dispatch(removeFriendStatus(updatedFriendStatus));
        }

      },
      (errors) => dispatch(receiveFriendStatusErrors(errors.responseJSON))
    );
  };
};

export const deleteFriendStatus = (friendStatusId) => {
  return (dispatch) => {
    return FriendsApiUtil.deleteFriendStatus(friendStatusId).then(
      (deletedId) => dispatch(removeFriendStatus(deletedId)),
      (errors) => dispatch(receiveFriendStatusErrors(errors.responseJSON))
    );
  };
};
