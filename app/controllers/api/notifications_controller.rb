class Api::NotificationsController < ApplicationController
  def index
    @notifications = Notification.where("user_id = ? AND read = ?", current_user.id, false)
                                 .includes(:notifiable)
                                 .order(created_at: :desc)
    render :index
  end
end