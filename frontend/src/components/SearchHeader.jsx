function SearchHeader({ search, onSearchChange, onSubmit, onReset }) {
  return (
    <header className="hero">
      <button type="button" className="brand-button" onClick={onReset}>
        <h1>CookingMama</h1>
        <p className="eyebrow">Des recettes faciles à cuisiner</p>
      </button>

      <form className="search-box" onSubmit={onSubmit}>
        <span className="search-icon">⌕</span>
        <input
          id="recipe-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Rechercher une recette"
          aria-label="Rechercher une recette"
        />
        <button type="submit" className="search-button">
          Rechercher
        </button>
      </form>
    </header>
  )
}

export default SearchHeader
