Rails.application.routes.draw do
  namespace :api do
    get "health", to: "health#index"
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
