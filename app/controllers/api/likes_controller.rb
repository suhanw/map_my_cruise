class Api::LikesController < ApplicationController
  before_action :require_login

  def show
    @like = Like.includes(:user).find_by(id: params[:id])
    if @like
      render :show, status: 200
    else
      render json: ["This like does not exist"], status: 404
    end
  end

  def create
    load_likable
    @like = @likable.likes.new(user: current_user)
    @like.notification = Notification.new(user_id: @likable.user_id, read: false)
    if @like.save
      render :show, status: 200
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroy
    @like = Like.find_by(id: params[:id])
    if @like
      @like.destroy
      render :show, status: 200
    else
      render json: ["This like does not exist"], status: 404
    end
  end

  private
  def load_likable
    resource, id = request.path.split('/').slice(2, 2)
    @likable = resource.singularize.classify.constantize.find(id)
  end
end
