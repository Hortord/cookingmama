class AddSearchColumn < ActiveRecord::Migration[7.2]
  def up
    create_tsvector_update_column
    add_index :recipes, :name_searchable_index_col, using: "gin"
    add_index :recipes, :ingredients_searchable_index_col, using: "gin"
  end

  def down
    remove_index :recipes, :name_searchable_index_col
    remove_index :recipes, :ingredients_searchable_index_col
    remove_column :recipes, :name_searchable_index_col
    remove_column :recipes, :ingredients_searchable_index_col
  end

  private

  def create_tsvector_update_column
    execute <<~SQL.squish
    ALTER TABLE recipes
    ADD COLUMN name_searchable_index_col tsvector
    GENERATED ALWAYS AS (to_tsvector('english', coalesce(name, ''))) STORED;

    ALTER TABLE recipes
    ADD COLUMN ingredients_searchable_index_col tsvector
    GENERATED ALWAYS AS (to_tsvector('english',array_to_tsvector(ingredients)::text)) STORED;
    
    SQL
  end
end