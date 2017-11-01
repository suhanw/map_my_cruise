class Api::WorkoutsController < ApplicationController
  before_action :require_login

  def index
    @workouts = current_user.workouts.order(workout_date: :desc).includes(:route)
    render :index
  end

  def show
    @workout = Workout.includes(:comments).order("comments.created_at").find_by(id: params[:id])
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
    if params[:workout][:workout_date] == ""
      params[:workout][:workout_date] = nil
    else
      params[:workout][:workout_date] = Date.parse params[:workout][:workout_date]
    end
    params.require(:workout).permit(
      :route_id,
      :name,
      :duration,
      :privacy,
      :workout_date,
    )

  end
end
