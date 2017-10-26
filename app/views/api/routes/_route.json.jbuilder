json.extract! route,
  :id,
  :user_id,
  :name,
  :polyline,
  :city,
  :distance,
  :elevation,
  :privacy

json.created_at route.created_at.strftime("%m/%d/%Y");
