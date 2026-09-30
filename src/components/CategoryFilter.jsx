import { useRef, useState } from "react";

const GENRE_CONFIG = {
  Action: { icon: "🔥", label: "Action" },
  Adventure: { icon: "⛰️", label: "Adventure" },
  Animation: { icon: "🎨", label: "Animation" },
  Comedy: { icon: "😊", label: "Comedy" },
  Crime: { icon: "🎭", label: "Crime" },
  Drama: { icon: "🎭", label: "Drama" },
  Family: { icon: "👥", label: "Family" },
  Fantasy: { icon: "🪄", label: "Fantasy" },
  Horror: { icon: "💀", label: "Horror" },
  "Science Fiction": { icon: "🪐", label: "Sci-Fi" },
  "Sci-Fi": { icon: "🪐", label: "Sci-Fi" },
  Thriller: { icon: "💓", label: "Thriller" },
  Mystery: { icon: "🕵️", label: "Mystery" },
  Romance: { icon: "💖", label: "Romance" },
  Music: { icon: "🎵", label: "Music" },
  History: { icon: "📜", label: "History" },
  War: { icon: "⚔️", label: "War" },
  Western: { icon: "🤠", label: "Western" },
  Documentary: { icon: "📽️", label: "Documentary" },
  "TV Movie": { icon: "📺", label: "TV Movie" },
};

function CategoryFilter({ genres, selectedGenre, onGenreChange }) {
  const scrollRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const getGenreDisplay = (name) => {
    return GENRE_CONFIG[name] || { icon: "🎬", label: name };
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="genre-filter-wrapper" id="genres-section">
      <div className="section-header-row">
        <h2 className="section-heading">Browse by Genre</h2>
        <button
          type="button"
          className="section-link-btn"
          onClick={handleToggleExpand}
        >
          {isExpanded ? "Collapse ←" : "View all →"}
        </button>
      </div>

      <div
        ref={scrollRef}
        className={`genre-chips-container ${isExpanded ? "expanded" : ""}`}
      >
        {/* "All" button */}
        <button
          type="button"
          className={`genre-chip ${selectedGenre === "" ? "active" : ""}`}
          onClick={() => onGenreChange("")}
        >
          <span className="genre-chip-icon">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
            </svg>
          </span>
          <span className="genre-chip-label">All</span>
        </button>

        {genres.map((genre) => {
          const display = getGenreDisplay(genre.name);
          const isSelected = selectedGenre === genre.id.toString();

          return (
            <button
              key={genre.id}
              type="button"
              className={`genre-chip ${isSelected ? "active" : ""}`}
              onClick={() => onGenreChange(genre.id.toString())}
            >
              <span className="genre-chip-emoji">{display.icon}</span>
              <span className="genre-chip-label">{display.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryFilter;