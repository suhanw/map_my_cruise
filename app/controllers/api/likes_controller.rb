class Api::LikesController < ApplicationController
  before_action :require_login, :load_likable

  def show
    @like = Like.find_by(id: params[:id])
  end

  def create
    @like = @likable.likes.new(user: current_user)
    if @like.save
      render json: ['Success!'] #to update
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroy
    
  end

  private
  def load_likable
    resource, id = request.path.split('/').slice(2, 2)
    @likable = resource.singularize.classify.constantize.find(id)
  end

end
