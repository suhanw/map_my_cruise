Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api do
    resources :users, only: [:create, :update, :index]
    resource :session, only: [:create, :destroy]
  end

end
