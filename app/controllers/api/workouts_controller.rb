class Api::WorkoutsController < ApplicationController
  before_action :require_login

  def index
    @workouts = current_user.workouts.order(created_at: :desc)
    render :index
  end

  def show
    @workout = Workout.find_by(id: params[:id])
    if !@workout
      render json: ["This workout does not exist"], status: 404
    elsif !current_user.owns_workout?(@workout)
      render json: ["This is not your workout"], status: 401
    else
      render :show
    end
  end

  def create
    @workout = Workout.new(workout_params)
    @workout.user = current_user
    if @workout.save
      render :show
    else
      render json: @workout.errors.full_messages, status: 422
    end
  end

  def update
    @workout = Workout.find_by(id: params[:id])
    if !@workout
      render json: ["This workout does not exist"], status: 404
    elsif !current_user.owns_workout?(@workout)
      render json: ["This is not your workout"], status: 401
    else
      if @workout.update(workout_params)
        render :show
      else
        render json: @workout.errors.full_messages, status: 422
      end

    end
  end

  def destroy
    @workout = Workout.find_by(id: params[:id])
    if !@workout
      render json: ["This workout does not exist"], status: 404
    elsif !current_user.owns_workout?(@workout)
      render json: ["This is not your workout"], status: 401
    else
      @workout.destroy
      render :show
    end
  end

  private
  def workout_params
    params.require(:workout).permit(
      :route_id,
      :name,
      :duration,
      :privacy
    )

  end
end
