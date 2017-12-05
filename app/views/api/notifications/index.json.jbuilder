ordered_ids = []

json.notifications_by_id do
  @notifications.each do |notification|
    ordered_ids.push(notification.id)
    json.set! notification.id do
      json.extract! notification, :id, :user_id, :notifiable_type, :notifiable_id
    end
  end
end

json.ordered_ids ordered_ids
