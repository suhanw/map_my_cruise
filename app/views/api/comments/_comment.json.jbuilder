json.extract! comment, :id, :body, :workout_id
json.created_at comment.created_at.strftime("%m/%d/%Y")
json.user do
  json.partial! 'api/users/user', user: comment.user
end
