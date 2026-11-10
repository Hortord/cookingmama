import RecipeDetail from '../components/RecipeDetail'

function RecipePage({
  recipe,
  loading,
  search,
  onSearchChange,
  onSubmit,
  onSuggestionSelect,
  onReset,
}) {
  return (
    <RecipeDetail
      recipe={recipe}
      loading={loading}
      search={search}
      onSearchChange={onSearchChange}
      onSubmit={onSubmit}
      onSuggestionSelect={onSuggestionSelect}
      onReset={onReset}
    />
  )
}

export default RecipePage
