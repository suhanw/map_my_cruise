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
      render json: ['Please enter a search term.']
    elsif params[:search_term]
      @users = User.where("email LIKE ?", "%#{params[:search_term]}%")
    else
      render json: ['Please enter a search term.']
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
