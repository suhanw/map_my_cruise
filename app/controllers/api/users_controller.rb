class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find_by(id:params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    if params[:search_term] == ""
      render json: ['Please enter a search term.'], status: 404
    elsif !params[:search_term]
      render json: ['Please enter a search term.'], status: 404
    else
      already_friends = FriendStatus
                  .where("friender_id = ? OR friendee_id = ?", current_user.id, current_user.id)
                  .pluck(:friender_id, :friendee_id).flatten
      @users = User.where(
        "email LIKE ? OR fname LIKE ? OR lname LIKE ?",
        "%#{params[:search_term]}%", "%#{params[:search_term]}%", "%#{params[:search_term]}%"
      ).where("id NOT IN (?)", already_friends) unless already_friends.empty?

    end
  end

  def show
    @user = User.find_by(id:params[:id])
    render :show
  end

  private
  def user_params
    params.require(:user)
      .permit(
        :fname,
        :lname,
        :email,
        :country,
        :dob,
        :gender,
        :password,
        :image
      )
  end
end
