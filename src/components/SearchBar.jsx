import { useState } from "react";

function SearchBar({ onSearch, currentQuery = "" }) {
  const [searchText, setSearchText] = useState(currentQuery);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedText = searchText.trim();
    if (trimmedText) {
      onSearch(trimmedText);
    }
  };

  const handleClear = () => {
    setSearchText("");
    onSearch("");
  };

  return (
    <form className="hero-search-box" onSubmit={handleSubmit}>
      <div className="search-icon-wrapper">
        <svg
          className="input-search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      <input
        id="hero-search-input"
        type="text"
        placeholder="Search for a movie, actor, or genre..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        autoComplete="off"
      />

      {searchText && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={handleClear}
          title="Clear search"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}

      <button type="submit" className="hero-search-btn">
        Search
      </button>
    </form>
  );
}

export default SearchBar;