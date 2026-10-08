import RecipeDetail from '../components/RecipeDetail'

function RecipePage({ recipe, loading, onBack }) {
  return <RecipeDetail recipe={recipe} loading={loading} onBack={onBack} />
}

export default RecipePage
