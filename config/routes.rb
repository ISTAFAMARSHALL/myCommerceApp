Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :products
  resources :users
  resources :orders
  resources :carts
  resources :cart_items
  resources :orders, only: [:create]

  get "/products/:category", to: "products#category"
  get "/me", to: "users#me"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  
end
