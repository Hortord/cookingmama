module Api
  class HealthController < ApplicationController
    def index
      render json: {
        status: "ok",
        app: "cookingmama",
        environment: Rails.env
      }
    end
  end
end
