Rails.application.routes.draw do
  resources :favorites
  resources :wishlists
  resources :services
  resources :service_types
  resources :durations
  resources :users, only: [:index, :create, :show]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # get '/hello', to: 'application#hello_world'

  post "/login", to: "sessions#login"

  get "/authorized_user", to: "users#show"

  delete "/logout", to: "sessions#logout"
  
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
