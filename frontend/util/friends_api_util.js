export const fetchFriendStatuses = () => {
  return $.ajax({
    url: 'api/friend_statuses',
    method: 'get',
  });
};

// 'friendStatus' is in the form of {friendee_id: 123}
export const createFriendStatus = (friendStatus) => {
  return $.ajax({
    url: 'api/friend_statuses',
    method: 'post',
    data: {
      friend: friendStatus
    }
  });
};

// 'friendStatus' is in the form of {id: 456, friend_status: 'yes' or 'no'}
export const updateFriendStatus = (friendStatus) => {
  return $.ajax({
    url: `api/friend_statuses/${friendStatus.id}`,
    method: 'patch',
    data: {
      friend: friendStatus
    }
  });
};

export const deleteFriendStatus = (friendStatusId) => {
  return $.ajax({
    url: `api/friend_statuses/${friendStatusId}`,
    method: 'delete',
  });
};
