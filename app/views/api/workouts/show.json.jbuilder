
json.workout do
  json.partial! 'api/workouts/workout', workout: @workout
  json.comments do
    json.array! @workout.comments do |comment|
      json.partial! 'api/comments/comment', comment: comment
    end
  end
  json.likes do
    json.array! @workout.likes do |like|
      json.partial! 'api/likes/like', like: like
    end
  end
end
