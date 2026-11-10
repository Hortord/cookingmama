require "test_helper"

class Api::V1::RecipesControllerTest < ActionDispatch::IntegrationTest
  test "returns alphabetically sorted recipes matching the backend query" do
    Recipe.create!(
      name: "Tomate",
      cooking_time: 20,
      preparation_time: 10,
      ingredients: ["Tomate"]
    )
    Recipe.create!(
      name: "Salade",
      cooking_time: 15,
      preparation_time: 10,
      ingredients: ["Tomate", "Laitue"]
    )

    get api_v1_recipes_url(q: "laitue")

    assert_response :success
    assert_equal ["Salade"], response.parsed_body.map { |recipe| recipe["name"] }
  end

  test "returns lightweight suggestions for autocomplete" do
    Recipe.create!(
      name: "Salade",
      cooking_time: 15,
      preparation_time: 10,
      ingredients: ["Laitue"]
    )

    get autocomplete_api_v1_recipes_url(q: "sal")

    assert_response :success
    assert_equal 1, response.parsed_body.length
    assert_equal "Salade", response.parsed_body.first["name"]
    assert response.parsed_body.first.key?("id")
    assert response.parsed_body.first.key?("ingredients")
end
