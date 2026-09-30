import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getMovieDetails } from "../services/movieApi";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch {
        setError("Unable to load movie details. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!movie) {
    return <ErrorMessage message="Movie not found." />;
  }

  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const backdrop = movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : "";

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "Unknown";

  const formattedRevenue = movie.revenue
    ? `$${(movie.revenue / 1000000).toFixed(1)}M`
    : null;

  const formattedBudget = movie.budget
    ? `$${(movie.budget / 1000000).toFixed(1)}M`
    : null;

  return (
    <main className="movie-details-page">
      <section
        className="details-hero-backdrop"
        style={{
          backgroundImage: backdrop
            ? `linear-gradient(180deg, rgba(11, 13, 20, 0.6) 0%, rgba(11, 13, 20, 0.88) 60%, #0b0d14 100%), url(${backdrop})`
            : "none",
        }}
      >
        <div className="details-container">
          <button
            type="button"
            className="details-back-btn"
            onClick={() => navigate(-1)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back</span>
          </button>

          <div className="details-layout">
            {/* Poster Card */}
            <div className="details-poster-wrap">
              <img
                src={poster}
                alt={movie.title}
                className="details-poster-img"
              />
              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="official-website-link"
                >
                  Visit Official Website ↗
                </a>
              )}
            </div>

            {/* Movie Info */}
            <div className="details-info-panel">
              <h1 className="details-title">{movie.title}</h1>

              {movie.tagline && (
                <p className="details-tagline">"{movie.tagline}"</p>
              )}

              {/* Rating & Stats Bar */}
              <div className="details-rating-row">
                <div className="rating-pill-large">
                  <span className="star-icon">⭐</span>
                  <span className="rating-score">{rating}</span>
                  <span className="rating-max">/ 10</span>
                </div>
                <span className="vote-count">({movie.vote_count?.toLocaleString()} votes)</span>
              </div>

              {/* Metadata Badges */}
              <div className="details-meta-chips">
                <span className="meta-chip">
                  <span className="chip-icon">📅</span>
                  <span>{movie.release_date || releaseYear}</span>
                </span>
                {movie.runtime > 0 && (
                  <span className="meta-chip">
                    <span className="chip-icon">⏱️</span>
                    <span>{movie.runtime} min</span>
                  </span>
                )}
                {movie.original_language && (
                  <span className="meta-chip">
                    <span className="chip-icon">🌐</span>
                    <span>{movie.original_language.toUpperCase()}</span>
                  </span>
                )}
                {movie.status && (
                  <span className="meta-chip status-chip">
                    <span>{movie.status}</span>
                  </span>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="details-genres-list">
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className="details-genre-badge">
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div className="details-overview-block">
                <h2 className="overview-title">Overview</h2>
                <p className="overview-text">
                  {movie.overview || "No overview available for this movie."}
                </p>
              </div>

              {/* Additional Details Grid */}
              <div className="details-extra-grid">
                {formattedBudget && (
                  <div className="extra-stat-item">
                    <span className="extra-label">Budget</span>
                    <span className="extra-value">{formattedBudget}</span>
                  </div>
                )}
                {formattedRevenue && (
                  <div className="extra-stat-item">
                    <span className="extra-label">Revenue</span>
                    <span className="extra-value">{formattedRevenue}</span>
                  </div>
                )}
                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div className="extra-stat-item">
                    <span className="extra-label">Production</span>
                    <span className="extra-value">
                      {movie.production_companies.slice(0, 2).map((c) => c.name).join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MovieDetails;