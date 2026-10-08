class CreateRecipes < ActiveRecord::Migration[7.2]
  def change
    create_table :recipes do |t|
      t.string :name, null: false
      t.integer :cooking_time, null: false
      t.integer :preparation_time, null: false
      t.string :category, null: true
      t.string :image_url, null: true

      t.string :ingredients, array: true, default: []

      t.timestamps
    end
  end
end
