ordered_ids = []
unread_count = 0

json.notifications_by_id do
  @notifications.each do |notification|
    unread_count += 1 unless notification.read
    ordered_ids.push(notification.id)
    json.set! notification.id do
      json.extract! notification, :id, :user_id, :notifiable_type, :notifiable_id, :read
    end
  end
end

json.ordered_ids ordered_ids
json.unread_count unread_count
