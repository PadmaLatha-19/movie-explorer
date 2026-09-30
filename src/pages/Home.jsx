import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import MovieGrid from "../components/MovieGrid";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import {
  getPopularMovies,
  searchMovies,
  getGenres,
  getMoviesByGenre
} from "../services/movieApi";

function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Load popular movies and genres
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError("");

        const [movieData, genreData] = await Promise.all([
          getPopularMovies(),
          getGenres()
        ]);

        setMovies(movieData || []);
        setGenres(genreData || []);
      } catch {
        setError("Unable to load movies. Please check your internet connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Search movies
  const handleSearch = async (query) => {
    if (!query) {
      // Reset to popular movies
      setSearchQuery("");
      handleGenreChange("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSelectedGenre("");
      setSearchQuery(query);

      const results = await searchMovies(query);
      setMovies(results || []);
    } catch {
      setError("Unable to search movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter by genre
  const handleGenreChange = async (genreId) => {
    try {
      setLoading(true);
      setError("");
      setSelectedGenre(genreId);
      setSearchQuery("");

      if (genreId === "") {
        const results = await getPopularMovies();
        setMovies(results || []);
      } else {
        const results = await getMoviesByGenre(genreId);
        setMovies(results || []);
      }
    } catch {
      setError("Unable to load movies for this category.");
    } finally {
      setLoading(false);
    }
  };

  // Find selected genre name for section title
  const currentGenreObj = genres.find((g) => g.id.toString() === selectedGenre);
  const currentGenreName = currentGenreObj
    ? currentGenreObj.name === "Science Fiction"
      ? "Sci-Fi"
      : currentGenreObj.name
    : "";

  return (
    <main className="home-page-container">
      {/* Hero Banner Section */}
      <section className="hero-banner-wrapper" id="hero-section">
        <div className="hero-card">
          <div className="hero-image-backdrop"></div>
          <div className="hero-gradient-overlay"></div>

          <div className="hero-content">
            <span className="hero-eyebrow">EXPLORE A UNIVERSE OF MOVIES</span>
            <h1 className="hero-title">
              Find Your Next <br />
              <span className="purple-gradient-text">Favorite Movie</span>
            </h1>
            <p className="hero-subtitle">
              Search, explore, and discover thousands of movies from every genre, era, and corner of the world.
            </p>

            <div className="hero-search-container">
              <SearchBar onSearch={handleSearch} currentQuery={searchQuery} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="content-container">
        {/* Browse by Genre */}
        <CategoryFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
        />

        {/* Movies Section */}
        <section className="movies-catalog-section" id="popular-movies">
          <div className="section-header-row">
            <div className="title-with-pill">
              <h2 className="section-heading">
                {searchQuery ? (
                  <>Search results for <span className="highlight-query">"{searchQuery}"</span></>
                ) : selectedGenre ? (
                  <>{currentGenreName} Movies</>
                ) : (
                  "Popular Movies"
                )}
              </h2>
              {movies.length > 0 && !loading && (
                <span className="results-counter">{movies.length} movies</span>
              )}
            </div>

            {(searchQuery || selectedGenre) ? (
              <button
                type="button"
                className="section-link-btn"
                onClick={() => {
                  setSelectedGenre("");
                  setSearchQuery("");
                  handleGenreChange("");
                }}
              >
                Reset to All ✕
              </button>
            ) : (
              <a href="#popular-movies" className="section-link-btn">
                View all →
              </a>
            )}
          </div>

          {loading && <Loading />}

          {!loading && error && (
            <ErrorMessage message={error} />
          )}

          {!loading && !error && (
            <MovieGrid movies={movies} genres={genres} />
          )}
        </section>
      </div>
    </main>
  );
}

export default Home;