class Api::RoutesController < ApplicationController
  before_action :require_login

  def index
    @routes = current_user.routes.order(updated_at: :desc)
    render :index
  end

  def show
    @route = Route.find_by(id: params[:id])
    if !@route
      render json: ["This route does not exist"], status: 404
    # elsif !current_user.owns_route?(@route)
    #   render json: ["This is not your route"], status: 401
    else
      render :show
    end
  end

  def create
    @route = Route.new(route_params)
    @route.user = current_user
    @route.activity = Activity.new(user_id: current_user.id);
    if @route.save
      render :show
    else
      render json: @route.errors.full_messages, status: 422
    end
  end

  def update
    @route = Route.find_by(id: params[:id])
    if !@route
      render json: ["This route does not exist"], status: 404
    elsif !current_user.owns_route?(@route)
      render json: ["This is not your route"], status: 401
    else
      if @route.update(route_params)
        render :show
      else
        render json: @route.errors.full_messages, status: 422
      end
    end
  end

  def destroy
    @route = Route.find_by(id: params[:id])
    if !@route
      render json: ["This route does not exist"], status: 404
    elsif !current_user.owns_route?(@route)
      render json: ["This is not your route"], status: 401
    else
      @route.destroy
      render :show
    end
  end

  private
  def route_params
    params.require(:route).permit(
      :name,
      :polyline,
      :city,
      :distance,
      :elevation,
      :privacy
    )
  end

  # def checkRouteOwnership
  #   @route = Route.find(params[:id])
  #   render json: ["This is not your route"], status: 401 unless current_user.owns_route?(@route)
  # end
end
