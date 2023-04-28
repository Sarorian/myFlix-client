import { useState } from "react";
import { MovieCard} from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      description: "Inception is a mind-bending, action-packed sci-fi thriller that follows a skilled thief, Dom Cobb (Leonardo DiCaprio), who is tasked with planting an idea into the mind of a wealthy businessman. Cobb and his team of specialists must navigate the dream world to pull off the impossible heist while dealing with the dangers of their own subconscious UPDATED.",
      image:
        "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/7dfddd911b8040729896c5be83f8e139_6e2f4149-8cb4-414c-a33b-9e0065c55af3_480x.progressive.jpg?v=1573585216",
      director: "Christopher Nolan",
      genre: "Action"
    },
    {
      id: 2,
      title: "Psycho",
      description: "Marion Crane (Janet Leigh) is a secretary who embezzles money from her employer and goes on the run. She ends up at the Bates Motel, run by the seemingly harmless Norman Bates (Anthony Perkins), but soon discovers that things are not as they seem.",
      image:
        "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/88e906bdfb8f5edb3c296763b2d493f3_5a0dba93-779d-4b22-83b5-358c9dbfd6c4_480x.progressive.jpg?v=1573655105",
      director: "Alfred Hitchcock",
      genre: "Thriller"
    },
    {
      id: 3,
      title: "Schindler's List",
      description: "Based on a true story, the film follows German businessman Oskar Schindler as he saves the lives of more than a thousand Jewish refugees during the Holocaust by employing them in his factories.",
      image:
        "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/5fbfe03541a8ed224e7d0d132fb63181_c6f1956f-f5b8-4f11-b9e5-77d7dba5347c_480x.progressive.jpg?v=1573651232",
      director: "Steven Spielberg",
      genre: "Thriller"
    }
  ]);

  if (selectedMovie) {
    return (
      <movieView
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
          key={movie.id}
          movie={movie}
          onMovieClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
    </div>
  );
};
