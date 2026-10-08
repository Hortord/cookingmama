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
  } = useRecipes()

  if (selectedRecipe) {
    return <RecipePage recipe={selectedRecipe} loading={detailLoading} onBack={goBackToList} />
  }

  return (
    <HomePage
      recipes={recipes}
      loading={loading}
      error={error}
      search={search}
      onSearchChange={setSearch}
      onSubmit={handleSearchSubmit}
      onReset={goBackToList}
      onOpen={openRecipe}
    />
  )
}

export default App
