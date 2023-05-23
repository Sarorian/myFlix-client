import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({
  movie,
  movieId,
  onFavoriteMovieAdded,
  onFavoriteMovieRemoved,
  user,
}) => {
  const isFavorite = user.FavoriteMovies.includes(movieId);

  const handleFavoriteButtonClick = () => {
    if (isFavorite) {
      onFavoriteMovieRemoved(movieId);
    } else {
      onFavoriteMovieAdded(movieId);
    }
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movieId)}`}>
          <Button variant="Link">Open</Button>
        </Link>
        <Button
          variant={isFavorite ? "danger" : "success"}
          onClick={handleFavoriteButtonClick}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string,
  }).isRequired,
  movieId: PropTypes.string.isRequired, // Add movieId prop
  onFavoriteMovieAdded: PropTypes.func.isRequired,
  onFavoriteMovieRemoved: PropTypes.func.isRequired,
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
