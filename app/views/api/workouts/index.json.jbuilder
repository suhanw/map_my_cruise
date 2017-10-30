routes = {};

json.workouts_by_id do
  @workouts.each do |workout|
    json.set! workout.id do
      json.partial! '/api/workouts/workout', workout: workout
    end
  end
end

json.ordered_ids @workouts.map(&:id)
