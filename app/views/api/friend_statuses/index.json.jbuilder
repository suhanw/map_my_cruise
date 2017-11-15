current_user_id = current_user.id
@friend_statuses.each do |friend_status|
  json.set! friend_status.id do
    json.partial! 'api/friend_statuses/friend',
      friend_status: friend_status,
      current_user_id: current_user_id,
      friender: friend_status.friender,
      friendee: friend_status.friendee
  end
end
