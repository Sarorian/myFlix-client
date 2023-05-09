import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss"

export const MovieView = ({ movies, onFavoriteMovieAdded, }) => {
  const { movieId } = useParams();
  
  console.log("movieId:", movieId);
  console.log("movies:", movies);

  const movie = movies.find((m) => m.id === movieId);

  // Check if the movie is found or undefined
  if (!movie) {
    return <div>Movie not found</div>;
  }

    return (
      <div>
        <div>
          <img className="w-100" src={movie.image} />
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
        <button onClick={() => onFavoriteMovieAdded(movieId)}>Favorite</button>
      </div>
    );
  };
  