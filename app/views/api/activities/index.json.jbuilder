ordered_ids = []

json.activities_by_id do
  @activities.each do |activity|
    ordered_ids.push(activity.id)
    json.set! activity.id do
      json.extract! activity, :id, :user_id, :feedable_type, :feedable_id
    end
  end
end

json.ordered_ids ordered_ids
