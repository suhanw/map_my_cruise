require 'pusher'

class Api::CommentsController < ApplicationController
  before_action :require_login

  def show
    @comment = Comment.find_by(id: params[:id])
  end
  # above for testing


  def create

    @comment = Comment.new(comment_params)
    @comment.user = current_user
    @comment.activity = Activity.new()
    if @comment.save
      # create Pusher channel specific to workout owner
      owner = @comment.workout.user
      owner_channel = "user_#{owner.id}"
      Pusher.trigger(owner_channel, 'my-event', {
        message: "someone commented on #{owner.email}'s workout"
      })
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Comment.find_by(id: params[:id])
    if !@comment
      render json: ["This comment does not exist"], status: 404
    else
      @comment.destroy
      render :show
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :workout_id)
  end
end
