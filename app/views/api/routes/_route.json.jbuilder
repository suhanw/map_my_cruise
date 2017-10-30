json.extract! route,
  :id,
  :user_id,
  :name,
  :polyline,
  :city,
  :distance,
  :elevation,
  :privacy

json.created_at route.updated_at.strftime("%m/%d/%Y");
