import RecipeList from '../components/RecipeList'
import SearchHeader from '../components/SearchHeader'

function HomePage({ recipes, loading, error, search, onSearchChange, onSubmit, onReset, onOpen }) {
  return (
    <main className="home-page">
      <SearchHeader
        search={search}
        onSearchChange={onSearchChange}
        onSubmit={onSubmit}
        onReset={onReset}
      />

      <RecipeList recipes={recipes} loading={loading} error={error} onOpen={onOpen} />
    </main>
  )
}

export default HomePage
