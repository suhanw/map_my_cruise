class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :logged_in?, :current_user

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    @current_user = user
    session[:session_token] = @current_user.reset_session_token!
  end

  def logout
    @current_user.reset_session_token!
    @current_user = nil
    session[:session_token] = nil
  end

  def require_login
    unless logged_in?
      render json: ["You must be logged in to access this resource"], status: 401
    end
  end
end
