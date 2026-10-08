Rails.application.routes.draw do
  namespace :api do
    get "health", to: "health#index"

    namespace :v1 do
      resources :recipes
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
