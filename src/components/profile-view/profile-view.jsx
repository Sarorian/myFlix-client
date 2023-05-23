import React from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { UpdateProfileView } from "../update-profile-view/update-profile-view";
import UserInfo from "./user-info";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfileView = ({
  user,
  movies,
  token,
  onFavoriteMovieAdded,
  onFavoriteMovieRemoved,
}) => {
  const handleDeleteAccount = () => {
    fetch(`https://supercoolmovieapi.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Response Status:", response.status);
        if (response.status === 200) {
          console.log("Account deleted successfully");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        } else if (response.status === 400) {
          throw new Error(`${user.Username} was not found`);
        } else {
          throw new Error("Account deletion failed");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <h3>User Info</h3>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <h3>Update Profile</h3>
              <UpdateProfileView user={user} token={token} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          {user.FavoriteMovies.length > 0 ? (
            <Row>
              {user.FavoriteMovies.map((movieId) => {
                const movie = movies.find((m) => m.id === movieId);
                if (movie) {
                  return (
                    <Col xs={12} sm={6} md={4} lg={3} key={movieId}>
                      <MovieCard
                        movie={movie}
                        movieId={movieId}
                        user={user}
                        onFavoriteMovieAdded={onFavoriteMovieAdded}
                        onFavoriteMovieRemoved={onFavoriteMovieRemoved}
                      />
                    </Col>
                  );
                }
                return null;
              })}
            </Row>
          ) : (
            <p>
              You don't have any favorite movies. Click <Link to="/">here</Link>{" "}
              to add some
            </p>
          )}
        </Col>
      </Row>

      <div className="mt-4">
        <Button variant="danger" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </div>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
};
