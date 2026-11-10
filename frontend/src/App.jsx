import './App.css'
import HomePage from './pages/HomePage'
import RecipePage from './pages/RecipePage'
import useRecipes from './hooks/useRecipes'

function App() {
  const {
    recipes,
    selectedRecipe,
    loading,
    error,
    detailLoading,
    search,
    setSearch,
    openRecipe,
    goBackToList,
    handleSearchSubmit,
    handleSearchSuggestion,
  } = useRecipes()

  if (selectedRecipe) {
    return (
      <RecipePage
        recipe={selectedRecipe}
        loading={detailLoading}
        search={search}
        onSearchChange={setSearch}
        onSubmit={handleSearchSubmit}
        onSuggestionSelect={handleSearchSuggestion}
        onReset={goBackToList}
      />
    )
  }

  return (
    <HomePage
      recipes={recipes}
      loading={loading}
      error={error}
      search={search}
      onSearchChange={setSearch}
      onSubmit={handleSearchSubmit}
      onSuggestionSelect={handleSearchSuggestion}
      onReset={goBackToList}
      onOpen={openRecipe}
    />
  )
}

export default App
