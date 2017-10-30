json.extract! workout,
  :id,
  :user_id,
  :route_id,
  :name,
  :duration,
  :privacy

json.created_at workout.created_at.strftime("%m/%d/%Y");
