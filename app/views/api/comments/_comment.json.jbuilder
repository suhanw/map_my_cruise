json.extract! comment, :id, :body, :workout_id
json.user do
  json.partial! 'api/users/user', user: comment.user
end
