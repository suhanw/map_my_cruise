Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: { format: 'json' } do
    resources :users, only: [:create, :update, :index]
    resource :session, only: [:create, :destroy]

    concern :commentable do
      resources :comments, only: [:create]
    end

    concern :likable do
      resources :likes, only: [:create]
    end

    resources :routes, only: [:index, :show, :create, :update, :destroy]
    resources :workouts, only: [:index, :show, :create, :update, :destroy], concerns: [:likable, :commentable]

    resources :friend_statuses, only: [:index, :create, :update, :destroy, :show]

    resources :activities, only: [:index]

    resources :notifications, only: [:index, :update]

    # resources :workouts do
    #   resources :comments, only: [:create]
    #   # resources :likes, only: [:create]
    # end

    resources :comments, only: [:destroy, :show]
    resources :likes, only: [:destroy, :show]


  end

end
