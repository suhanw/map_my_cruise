
json.workout do
  json.partial! 'api/workouts/workout', workout: @workout
  json.comments do
    json.array! @workout.comments do |comment|
      json.partial! 'api/comments/comment', comment: comment
    end
  end
end
