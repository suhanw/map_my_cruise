class Api::NotificationsController < ApplicationController
  before_action :require_login
  def index
    @notifications = Notification.where("user_id = ?", current_user.id)
                                 .includes(:notifiable)
                                 .order(created_at: :desc)
    render :index
  end
end
