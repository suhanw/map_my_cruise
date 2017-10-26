Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: { format: 'json' } do
    resources :users, only: [:create, :update, :index]
    resource :session, only: [:create, :destroy]

    resources :routes, only: [:index, :show, :create, :update, :destroy]
  end

end
