@friend_statuses.each do |friend_status|
  json.set! friend_status.id do
    json.partial! 'api/friend_statuses/friend', friend_status: friend_status
  end
end
