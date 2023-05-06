import { useState, useEffect } from "react";
import { MovieCard} from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [token, setToken] = useState(storedToken);
  useEffect(() => {
    if (!token) return;
    fetch("https://supercoolmovieapi.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
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
  }, [token]);

  return (
    <Row className="justify-content-md-center"> 
      {!user ? (
        <Col md={5}>
        <LoginView onLoggedIn={(user) => setUser(user)} />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8} style={{ border: "1px solid black"}}>
        <MovieView 
          movie={selectedMovie} 
          onBackClick={() => setSelectedMovie(null)} 
        />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
            </Col>
            
          ))}
          <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </>

              

      )}
    </Row>
);
};
