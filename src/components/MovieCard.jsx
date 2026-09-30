import { Link } from "react-router-dom";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w780";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie, genres = [] }) {
  // Prefer backdrop for widescreen cinematic cards like the reference; fallback to poster
  const imageUrl = movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : movie.poster_path
    ? `${POSTER_BASE_URL}${movie.poster_path}`
    : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=780&auto=format&fit=crop&q=80";

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  // Determine primary genre name
  const getPrimaryGenre = () => {
    if (movie.genres && movie.genres.length > 0) {
      const name = movie.genres[0].name;
      return name === "Science Fiction" ? "Sci-Fi" : name;
    }
    if (movie.genre_ids && movie.genre_ids.length > 0 && genres.length > 0) {
      const match = genres.find((g) => g.id === movie.genre_ids[0]);
      if (match) {
        return match.name === "Science Fiction" ? "Sci-Fi" : match.name;
      }
    }
    return "Cinema";
  };

  const primaryGenre = getPrimaryGenre();

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link" aria-label={movie.title}>
      <article className="cinematic-movie-card">
        {/* Poster / Backdrop Image Container */}
        <div className="card-media-wrapper">
          <img
            src={imageUrl}
            alt={movie.title}
            className="card-media-image"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=780&auto=format&fit=crop&q=80";
            }}
          />

          {/* Rating Badge Top Right */}
          <div className="card-rating-badge">
            <span className="star-icon">⭐</span>
            <span className="rating-value">{rating}</span>
          </div>

          <div className="card-overlay-gradient"></div>
        </div>

        {/* Movie Info */}
        <div className="card-meta-content">
          <h3 className="card-movie-title" title={movie.title}>
            {movie.title}
          </h3>
          <p className="card-movie-subtext">
            <span>{releaseYear}</span>
            <span className="meta-separator">•</span>
            <span>{primaryGenre}</span>
          </p>
        </div>
      </article>
    </Link>
  );
}

export default MovieCard;