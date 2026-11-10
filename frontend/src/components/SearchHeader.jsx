import { useEffect, useState } from 'react'

function highlightText(text, query) {
  const normalizedText = text.toLocaleLowerCase('fr')
  const normalizedQuery = query.trim().toLocaleLowerCase('fr')

  if (!normalizedQuery || !normalizedText.includes(normalizedQuery)) {
    return text
  }

  const index = normalizedText.indexOf(normalizedQuery)
  return [
    text.slice(0, index),
    <mark key="match">{text.slice(index, index + normalizedQuery.length)}</mark>,
    text.slice(index + normalizedQuery.length),
  ]
}

function SearchHeader({
  search,
  onSearchChange,
  onSubmit,
  onSuggestionSelect,
  onReset,
}) {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const normalizedSearch = search.trim()

    if (!normalizedSearch || normalizedSearch.length < 4) {
      setSuggestions([])
      return undefined
    }

    const controller = new AbortController()
    const timer = window.setTimeout(() => {
      fetch(`/api/v1/recipes/autocomplete?q=${encodeURIComponent(normalizedSearch)}`, {
        signal: controller.signal,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Impossible de charger les suggestions')
          }

          return response.json()
        })
        .then((data) => setSuggestions(data))
        .catch((error) => {
          if (error.name !== 'AbortError') {
            setSuggestions([])
          }
        })
    }, 1200)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [search])

  return (
    <header className="hero">
      <button type="button" className="brand-button" onClick={onReset}>
        <h1>CookingMama</h1>
        <p className="eyebrow">Des recettes faciles à cuisiner</p>
      </button>

      <form className="search-box" onSubmit={onSubmit} role="search">
        <span className="search-icon">⌕</span>
        <input
          id="recipe-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Rechercher une recette"
          aria-label="Rechercher une recette"
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="recipe-suggestions"
          aria-expanded={suggestions.length > 0}
        />
        <button type="submit" className="search-button">
          Rechercher
        </button>

        {suggestions.length > 0 && (
          <ul id="recipe-suggestions" className="recipe-suggestions" role="listbox">
            {suggestions.map((recipe) => (
              <li key={recipe.id} role="option">
                <button
                  type="button"
                  className="recipe-suggestion"
                  onClick={() => onSuggestionSelect(recipe.id)}
                >
                  <div className="recipe-suggestion-name">
                    {highlightText(recipe.name, search)}
                  </div>
                  <div>
                    Ingrédients : {recipe.ingredients && highlightText(recipe.ingredients.join(', '), search)}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </form>
    </header>
  )
}

export default SearchHeader
