class Api::ActivitiesController < ApplicationController
  before_action :require_login
  def index

    # get actual friends
    friends = current_user.requested_friends.where("friend_statuses.friend_status = 'yes'")
    friends += current_user.received_friends.where("friend_statuses.friend_status = 'yes'")
    relevant_users = friends << current_user

    offset = params['offset'].to_i

    @activities = Activity.where(user: relevant_users)
                          .includes(:feedable)
                          .includes(:user)
                          .order(updated_at: :desc)
                          .offset(offset)
                          .limit(3)
    render :index
  end
end
