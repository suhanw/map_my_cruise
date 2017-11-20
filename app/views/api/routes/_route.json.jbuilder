json.extract! route,
  :id,
  :name,
  :polyline,
  :city,
  :distance,
  :elevation,
  :privacy

json.created_at route.updated_at.strftime("%m/%d/%Y");

json.user do
  json.partial! 'api/users/user', user: route.user
end

if route.activity # when route is deleted, activity is destroyed, so this will be falsey
  json.activity_id route.activity.id
end
