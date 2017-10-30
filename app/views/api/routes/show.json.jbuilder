json.route do
  json.partial! 'api/routes/route', route: @route
end

json.user do
  json.partial! 'api/users/user', user: @route.user
end
