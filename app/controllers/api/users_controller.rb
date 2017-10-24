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
    # TODO: to refactor with query search params
    @users = User.all
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
        :password
      )
  end
end
