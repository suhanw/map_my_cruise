userIds = []

json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
    userIds.push(user.id)
  end
end

json.userSearchResults userIds
