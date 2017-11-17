class Api::ActivitiesController < ApplicationController
  def index
    # get actual friends
    friends = current_user.requested_friends.where("friend_statuses.friend_status = 'yes'") + current_user.received_friends.where("friend_statuses.friend_status = 'yes'")
    relevant_users = friends << current_user
    @activities = Activity.where(user: relevant_users).includes(:feedable).includes(:user)
    render :index
  end
end
