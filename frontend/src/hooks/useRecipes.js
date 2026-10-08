import { useEffect, useState } from 'react'

function useRecipes() {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [detailLoading, setDetailLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')

  useEffect(() => {
    const query = submittedSearch.trim()
    const url = query ? `/api/v1/recipes?q=${encodeURIComponent(query)}` : '/api/v1/recipes'

    setLoading(true)
    setError('')

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Impossible de charger les recettes')
        }

        return response.json()
      })
      .then((data) => {
        setRecipes(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Le backend est inaccessible ou la table est vide.')
        setLoading(false)
      })
  }, [submittedSearch])

  useEffect(() => {
    const handleHashChange = () => {
      const match = window.location.hash.match(/^#\/recipe\/(\d+)$/)

      if (!match) {
        setSelectedRecipe(null)
        return
      }

      const recipeId = Number(match[1])
      setDetailLoading(true)
      fetch(`/api/v1/recipes/${recipeId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Recette introuvable')
          }

          return response.json()
        })
        .then((recipe) => {
          setSelectedRecipe(recipe)
          setDetailLoading(false)
        })
        .catch(() => {
          setSelectedRecipe(null)
          setDetailLoading(false)
          setError('La recette demandée est introuvable.')
        })
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const openRecipe = (recipeId) => {
    window.location.hash = `#/recipe/${recipeId}`
  }

  const goBackToList = () => {
    window.location.hash = ''
    setSelectedRecipe(null)
    setSearch('')
    setSubmittedSearch('')
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setSubmittedSearch(search)
  }

  return {
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
  }
}

export default useRecipes
