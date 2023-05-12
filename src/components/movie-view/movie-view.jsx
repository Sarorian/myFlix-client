import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, user, onFavoriteMovieAdded, onFavoriteMovieRemoved }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  // Check if the movie is found or undefined
  if (!movie) {
    return <div>Movie not found</div>;
  }

  console.log(user);

  // Check if the movie ID is in the user's favorite movies list
  const isFavorite = user.FavoriteMovies.includes(movieId);
  
  const handleFavoriteButtonClick = () => {
    if (isFavorite) {
      onFavoriteMovieRemoved(movieId);
    } else {
      onFavoriteMovieAdded(movieId);
    }
  };

  return (
    <div>
      <div>
        <img className="w-100" src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Directed by: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <Link to={"/"}>
        <button className="back-button">Back</button>
      </Link>
      <button onClick={handleFavoriteButtonClick}>
        {isFavorite ? "Remove from Favorites" : "Favorite"}
      </button>
    </div>
  );
};
