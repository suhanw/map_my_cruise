@activities.each do |activity|
  json.set! activity.id do
    json.extract! activity, :id, :user_id, :feedable_type
    json.feedable do
      if activity.feedable_type == 'Workout'
        json.partial! 'api/workouts/workout', workout: activity.feedable
      elsif activity.feedable_type == 'Route'
        json.partial! 'api/routes/route', route: activity.feedable
      end
    end
  end
end
