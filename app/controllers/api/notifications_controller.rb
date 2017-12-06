class Api::NotificationsController < ApplicationController
  before_action :require_login
  def index
    @notifications = Notification.where("user_id = ?", current_user.id)
                                 .includes(:notifiable)
                                 .order(created_at: :desc)
    render :index
  end

  def update
    @notification = Notification.find_by(id: params[:id])
    if @notification.update(notification_params)
      render json: ["Notification is read"], status: 200
    else
      render json: @notification.errors.full_messages, status: 422
    end
  end

  private
  def notification_params
    params.require(:notification).permit(:read)
  end
end
