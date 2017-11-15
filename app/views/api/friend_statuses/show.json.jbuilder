json.partial! 'api/friend_statuses/friend',
  friend_status: @friend_status,
  friender: @friend_status.friender,
  friendee: @friend_status.friendee,
  current_user_id: current_user.id
