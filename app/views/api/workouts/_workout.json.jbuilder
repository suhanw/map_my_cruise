json.extract! workout,
  :id,
  :user_id,
  :name,
  :duration,
  :privacy


json.created_at workout.created_at.strftime("%m/%d/%Y");

json.route do
  json.partial! 'api/routes/route', route: workout.route
end
