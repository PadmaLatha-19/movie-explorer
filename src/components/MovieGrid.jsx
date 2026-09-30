import MovieCard from "./MovieCard";

function MovieGrid({ movies, genres = [] }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="no-movies-box">
        <div className="empty-icon-wrap">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" />
            <line x1="17" y1="17" x2="22" y2="17" />
            <line x1="17" y1="7" x2="22" y2="7" />
          </svg>
        </div>
        <h3 className="empty-title">No movies found</h3>
        <p className="empty-desc">We couldn't find any movies matching your selection. Try a different keyword or genre.</p>
      </div>
    );
  }

  return (
    <div className="cinematic-movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          genres={genres}
        />
      ))}
    </div>
  );
}

export default MovieGrid;