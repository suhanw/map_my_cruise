class Api::LikesController < ApplicationController
  before_action :require_login, :load_likable

  def show
    @like = Like.find_by(id: params[:id])
  end

  def create
    @like = @likable.likes.new(user: current_user)
    if @like.save
      render json: ['Liked!'], status: 200 #to update
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroy
    @like = Like.find_by(id: params[:id])
    if !@like
      render json: ["This like does not exist"], status: 404
    else
      @like.destroy
      render json: ['Unliked!'], status: 200
    end
  end

  private
  def load_likable
    resource, id = request.path.split('/').slice(2, 2)
    @likable = resource.singularize.classify.constantize.find(id)
  end
end
