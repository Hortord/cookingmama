import { FALLBACK_IMAGE, getIngredients } from '../utils/recipes'

function RecipeCard({ recipe, onOpen }) {
  const ingredients = getIngredients(recipe)

  return (
    <button type="button" className="recipe-card" onClick={() => onOpen(recipe.id)}>
      <div className="recipe-image-wrap">
        <img src={recipe.image_url || FALLBACK_IMAGE} alt={recipe.name} className="recipe-image" />
      </div>

      <div className="recipe-content">
        <h3>{recipe.name}</h3>

        <div className="time-row">
          <span>Prépa : {recipe.preparation_time || 0} min</span>
          <span>Cuisson : {recipe.cooking_time || 0} min</span>
        </div>

        <div className="recipe-meta">
          <span className="category-tag">{recipe.category || 'Divers'}</span>
        </div>

        <ul className="ingredients-list">
          {ingredients.slice(0, 4).map((ingredient, index) => (
            <li key={`${recipe.id}-ingredient-${index}`}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </button>
  )
}

export default RecipeCard
