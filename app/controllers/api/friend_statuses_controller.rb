class Api::FriendStatusesController < ApplicationController
  before_action :require_login

  def index
    requested_friend_statuses = current_user.requested_friend_statuses.includes(:friendee).order(id: :desc)
    received_friends_statuses = current_user.received_friend_statuses.includes(:friender).order(id: :desc)
    @friend_statuses = requested_friend_statuses + received_friends_statuses
    render :index
  end

  def show
    @friend_status = FriendStatus.find_by(id: params[:id])
    render :show
  end

  def create # to submit friend request
    if current_user.is_friend_of?(User.find_by(id: friend_params[:friendee_id]))
      render json: ['You already tried to friend this person, creep.'], status: 422
      return
    end

    @friend_status = FriendStatus.new({
      friendee_id: friend_params[:friendee_id], # only has 'friendee'
      friender_id: current_user.id,
      friend_status: 'pending'
    })
    @friend_status.notification = Notification.new(user_id: @friend_status.friendee_id, read: false) # create notification for friendee

    if @friend_status.save
      render :show
    else
      render json: @friend_status.errors.full_messages, status: 422
    end
  end

  def update # to accept/reject friend request
    @friend_status = FriendStatus.find_by(id: params[:id])
    if friend_params[:friend_status] == 'yes' && @friend_status.update(friend_status: 'yes')
      @friend_status.activity = Activity.new(user_id: current_user.id) # add to activity feed
      render :show
    elsif friend_params[:friend_status] == 'no'
      @friend_status.destroy
      render :show
    else
      render json: ['Something went wrong, you are a horrible friend and human being.'], status: 422
    end
  end

  def destroy # to delete friend or friend request submitted previously
    @friend_status = FriendStatus.find_by(id: params[:id])
    @friend_status.destroy
    render :show
  end

  private

  def friend_params
    params.require(:friend).permit(:friendee_id, :friend_status)
  end

end
