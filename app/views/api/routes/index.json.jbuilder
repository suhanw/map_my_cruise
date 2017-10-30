json.routes_by_id do
  @routes.each do |route|
    json.set! route.id do
      json.partial! '/api/routes/route', route: route
    end
  end
end

json.ordered_ids @routes.map(&:id)
