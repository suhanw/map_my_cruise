# this will give us...
# {
#     id: 123123,
#     friend: {
#       id: 1,
#       email: "suhan@test.com",
#       ...
#     },
#     friender_id: 1
#     friend_status: "yes"
#   },

json.id friend_status.id
json.friend do
  if friend_status.friender == current_user
    json.partial! 'api/users/user', user: friend_status.friendee
  else
    json.partial! 'api/users/user', user: friend_status.friender
  end
end
json.friender_id friend_status.friender_id # to indicate who's the requestor
json.friend_status friend_status.friend_status
