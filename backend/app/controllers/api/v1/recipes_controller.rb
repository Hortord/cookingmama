module Api
  module V1
    class RecipesController < ApplicationController
      before_action :set_recipe, only: %i[ show update destroy ]

      # GET /api/v1/recipes
      def index
        filter = (params.dig(:filter, :ingredients) || []).join(' ')

        @recipes = filter.empty? ? Recipe.all.order(:name) : Recipe.search_by_text(filter)

        render json: @recipes
      end

      # GET /api/v1/recipes/:id
      def show
        render json: @recipe
      end

      # POST /api/v1/recipes
      def create
        @recipe = Recipe.new(recipe_params)

        if @recipe.save
          render json: @recipe, status: :created, location: api_v1_recipe_url(@recipe)
        else
          render json: @recipe.errors, status: :unprocessable_content
        end
      end

      # PATCH/PUT /api/v1/recipes/:id
      def update
        if @recipe.update(recipe_params)
          render json: @recipe
        else
          render json: @recipe.errors, status: :unprocessable_content
        end
      end

      # DELETE /api/v1/recipes/:id
      def destroy
        @recipe.destroy!
      end

      private

      def set_recipe
        @recipe = Recipe.find(params[:id])
      end

      def recipe_params
        params.require(:recipe).permit(:name, :cooking_time, :preparation_time, :category, :image_url, :ingredients, :filter)
      end
    end
  end
end
