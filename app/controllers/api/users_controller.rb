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
      return
    elsif !params[:search_term]
      render json: ['Please enter a search term.'], status: 404
      return
    end

    already_friends = FriendStatus
                .where("friender_id = ? OR friendee_id = ?", current_user.id, current_user.id)
                .pluck(:friender_id, :friendee_id).flatten

    already_friends = [current_user.id] if already_friends.empty?

    lowercase_search_terms = params[:search_term].downcase.split(" ");
    @users = [];

    if lowercase_search_terms.count == 2 # if user enters 2 terms, assume fname and lname
      search_fname = lowercase_search_terms[0];
      search_lname = lowercase_search_terms[1];
      @users += User.where("lower(fname) LIKE ? AND lower(lname) LIKE ?",
      "%#{search_fname}%", "%#{search_lname}%")
      .where("id NOT IN (?)", already_friends)
    else
      lowercase_search_terms.each do |lowercase_search_term|
        @users += User.where("lower(email) LIKE ? OR lower(fname) LIKE ? OR lower(lname) LIKE ?",
        "%#{lowercase_search_term}%", "%#{lowercase_search_term}%", "%#{lowercase_search_term}%")
        .where("id NOT IN (?)", already_friends) - @users # "-" will remove dups
      end
    end

    if @users.empty?
      render json: ['No users matched your search.'], status: 404
    else
      render :index
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
