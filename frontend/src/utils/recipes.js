export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'

export const getIngredients = (recipe) =>
  Array.isArray(recipe?.ingredients) ? recipe.ingredients : []

export const formatTotalTime = (recipe) =>
  (recipe?.cooking_time || 0) + (recipe?.preparation_time || 0)
