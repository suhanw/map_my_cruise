json.route do
  json.partial! 'api/routes/route', route: @route

  json.likes do
    json.array! @route.likes do |like|
      json.partial! 'api/likes/like', like: like
    end
  end
end
