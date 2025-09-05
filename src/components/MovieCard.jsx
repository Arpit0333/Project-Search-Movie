import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContexts";

function MovieCard({ movie }) {
  const { isFavorites, addToFavorites, removeFromFavorites } = useMovieContext();

 
  const movieId = movie.id || movie.imdbID;
  const favorite = isFavorites(movieId);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movieId);
    else addToFavorites({ ...movie, id: movieId }); 
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={
            movie.poster ||
            (movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image")
          }
          alt={movie.title || movie.name}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            {favorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title || movie.name}</h3>
        <p>{movie.release_date || movie.first_air_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;
