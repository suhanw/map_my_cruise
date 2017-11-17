json.extract! user, :id, :email, :fname, :lname
json.avatar_url asset_path(user.image.url)
json.created_at user.created_at.strftime("%m/%d/%Y")
