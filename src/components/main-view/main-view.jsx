import { useState, useEffect } from "react";
import { MovieCard} from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    fetch("https://supercoolmovieapi.herokuapp.com/movies")
      .then((res) => res.json())
      .then((data) => {
        console.log("data returned form api" + data);
          const moviesFromAPI = data.map((doc) => ({
            id: doc.key,
            title: doc.Title,
            image: doc.ImageURL,
            description: doc.Description,
            genre: doc.Genre.name,
            director: doc.Director.Name
          }));
          setMovies(moviesFromAPI);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => {
          setSelectedMovie(null);
        }}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
    </div>
  );
};
