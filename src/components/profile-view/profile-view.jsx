import React from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { UpdateProfileView } from "../update-profile-view/update-profile-view";
import UserInfo from "./user-info";
import { Col, Container, Row, Card, Button } from "react-bootstrap";

export const ProfileView = ({ user, movies, token }) => {
  const handleDeleteAccount = () => {
    // Code for deleting the account
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
          <h3>Favorite Movies</h3>
        </Col>
        <Col xs={12}>
          <Row>
            {user.FavoriteMovies.map((movieId) => {
              const movie = movies.find((m) => m.id === movieId);
              return (
                <Col xs={12} sm={6} md={4} lg={3} key={movieId}>
                  <MovieCard movie={movie} />
                </Col>
              );
            })}
          </Row>
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
