const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

const fetchData = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch data from TMDB");
  }

  return response.json();
};

// Get popular movies
export const getPopularMovies = async () => {
  const url =
    `${BASE_URL}/movie/popular` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&page=1`;

  const data = await fetchData(url);

  return data.results;
};

// Search movies
export const searchMovies = async (query) => {
  const url =
    `${BASE_URL}/search/movie` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&query=${encodeURIComponent(query)}` +
    `&page=1` +
    `&include_adult=false`;

  const data = await fetchData(url);

  return data.results;
};

// Get movie details
export const getMovieDetails = async (movieId) => {
  const url =
    `${BASE_URL}/movie/${movieId}` +
    `?api_key=${API_KEY}` +
    `&language=en-US`;

  return fetchData(url);
};

// Get movie genres
export const getGenres = async () => {
  const url =
    `${BASE_URL}/genre/movie/list` +
    `?api_key=${API_KEY}` +
    `&language=en-US`;

  const data = await fetchData(url);

  return data.genres;
};

// Get movies by genre
export const getMoviesByGenre = async (genreId) => {
  const url =
    `${BASE_URL}/discover/movie` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&sort_by=popularity.desc` +
    `&with_genres=${genreId}` +
    `&page=1`;

  const data = await fetchData(url);

  return data.results;
};