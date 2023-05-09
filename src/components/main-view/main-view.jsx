import { useState, useEffect } from "react";
import { MovieCard} from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser);
  const [movies, setMovies] = useState([]);
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
            id: doc._id,
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

//onFavoriteMovieAdded, ..Deleted. setUser afterwards

const onFavoriteMovieAdded = (movieId) => {
  fetch(`https://supercoolmovieapi.herokuapp.com/user/${user.Username}/movies/${movieId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        window.location.reload();
      } else {
        throw new Error("Error adding movie");
      }
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
};



  return (
    <BrowserRouter>
    <NavigationBar 
      user={user}
      onLoggedOut={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}
    />
      <Row className="justify-content-md-center">
      <Routes>
        <Route
          path="/signup"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )}
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={(user) => setUser(user)} />
                </Col>
              )}
            </>
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The List Is Empty!</Col>
              ) : (
                <Col md={8}>
                  <MovieView
                    movies={movies}
                    user={user}
                    onFavoriteMovieAdded={onFavoriteMovieAdded}
                  />
                </Col>
              )}
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col>
                  <ProfileView
                    user={user}
                  />
                </Col> 
              )}
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The List Is Empty!</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col className="mb-4" key={movie.id} md={3}>
                      <MovieCard key={movie._id} movie={movie}/>
                    </Col>
                  ))}
                </>
              )}
            </>
          }
        />
      </Routes>
    </Row>
  </BrowserRouter>   
);
};
