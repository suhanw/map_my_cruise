class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: ["Incorrect username or password. Please try again."], status: 401
    end
  end

  def destroy
    if logged_in?
      @user = current_user
      logout
      render 'api/users/show'
    else
      render json: ["You are not currently logged in."], status: 404
    end
  end
end
