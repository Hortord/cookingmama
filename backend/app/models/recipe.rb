class Recipe < ApplicationRecord
  include PgSearch::Model

  pg_search_scope :search_by_text,
                  against: [name: 'A', ingredients: 'B'],
                  order_within_rank: 'recipes.name ASC',
                  using: {
                    tsearch: {
                      dictionary: 'english',
                      tsvector_column: ['name_searchable_index_col', 'ingredients_searchable_index_col']
                    }
                  }
end
