Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: { format: 'json' } do
    resources :users, only: [:create, :update, :index]
    resource :session, only: [:create, :destroy]

    resources :routes, only: [:index, :show, :create, :update, :destroy]
    resources :workouts, only: [:index, :show, :create, :update, :destroy]

    resources :workouts do
      resources :comments, only: [:create]
    end

    resources :comments, only: [:destroy]

    resources :friend_statuses, only: [:index, :create, :update, :destroy]

    resources :activities, only: [:index]

    # # for testing
    # resources :comments, only: [:show]
    # resources :friend_statuses, only: [:show]
  end

end
