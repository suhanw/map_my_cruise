
json.extract! workout,
  :id,
  :name,
  :duration,
  :privacy,
  :workout_date

json.created_at workout.created_at.strftime("%m/%d/%Y")

json.user do
  json.partial! 'api/users/user', user: workout.user
end

json.route do
  json.partial! 'api/routes/route', route: workout.route
end

json.comments do
  json.array! @workout.comments do |comment|
    json.partial! 'api/comments/comment', comment: comment
  end
end
