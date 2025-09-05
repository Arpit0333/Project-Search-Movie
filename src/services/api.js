const API_KEY = "cc840b7a"; // your OMDb API key
const BASE_URL = "https://www.omdbapi.com/";

// 1. Fake "popular movies" (since OMDb doesn’t have /movie/popular)
export const getPopularMovies = async () => {
  try {
    // Hardcode a keyword (like "Avengers") to mimic "popular"
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=Avengers`);
    const data = await response.json();

    if (data.Response === "True") {
      return data.Search.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

// 2. Search movies by user query
export const searchMovies = async (query) => {
  try { 
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    if (data.Response === "True") {
      return data.Search.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};
