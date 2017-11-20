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

json.activity_id route.activity.id
