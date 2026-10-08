import { FALLBACK_IMAGE, formatTotalTime, getIngredients } from '../utils/recipes'

function RecipeDetail({ recipe, loading, onBack }) {
  const ingredients = getIngredients(recipe)

  if (loading) {
    return (
      <main className="detail-page">
        <header className="hero">
          <button type="button" className="brand-button" onClick={onBack}>
            <h1>CookingMama</h1>
            <p className="eyebrow">Des recettes faciles à cuisiner</p>
          </button>
        </header>
        <p className="state-message">Chargement de la recette…</p>
      </main>
    )
  }

  return (
    <main className="detail-page">
      <header className="hero">
        <button type="button" className="brand-button" onClick={onBack}>
          <h1>CookingMama</h1>
          <p className="eyebrow">Des recettes faciles à cuisiner</p>
        </button>
      </header>

      <article className="recipe-detail-card">
        <img src={recipe.image_url || FALLBACK_IMAGE} alt={recipe.name} className="detail-image" />

        <div className="detail-content">
          <div className="detail-header">
            <span className="category-tag">{recipe.category || 'Divers'}</span>
            <span className="recipe-time">{formatTotalTime(recipe)} min</span>
          </div>

          <h1>{recipe.name}</h1>

          <div className="time-row detail-times">
            <span>Prépa : {recipe.preparation_time || 0} min</span>
            <span>Cuisson : {recipe.cooking_time || 0} min</span>
          </div>

          <section className="detail-section">
            <h2>Ingrédients</h2>
            <ul className="ingredients-list detail-list">
              {ingredients.map((ingredient, index) => (
                <li key={`${recipe.id}-detail-${index}`}>{ingredient}</li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  )
}

export default RecipeDetail
