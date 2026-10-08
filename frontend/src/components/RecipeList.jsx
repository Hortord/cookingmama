import RecipeCard from './RecipeCard'

function RecipeList({ recipes, loading, error, onOpen }) {
  return (
    <section className="recipes-section">
      <div className="section-header">
        <h2>Recettes du moment</h2>
        <span>{recipes.length} recettes</span>
      </div>

      {loading ? (
        <p className="state-message">Chargement des recettes…</p>
      ) : error ? (
        <p className="state-message error">{error}</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onOpen={onOpen} />
          ))}
        </div>
      )}
    </section>
  )
}

export default RecipeList
