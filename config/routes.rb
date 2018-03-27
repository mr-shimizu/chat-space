Rails.application.routes.draw do
  resources :groups
  devise_for :users
root to: 'messages#index'
  get 'messages/index'
  resources :users, only: [:edit, :update]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
