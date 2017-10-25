json.extract! user, :id, :email, :fname, :lname
json.avatar_url asset_path(user.image.url)
