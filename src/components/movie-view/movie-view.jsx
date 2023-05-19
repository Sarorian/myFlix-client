import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({
  movies,
  user,
  onFavoriteMovieAdded,
  onFavoriteMovieRemoved,
}) => {
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
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Img variant="top" src={movie.image} alt={movie.title} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>
              <Card.Text>
                <strong>Directed by:</strong> {movie.director}
              </Card.Text>
              <Card.Text>
                <strong>Genre:</strong> {movie.genre}
              </Card.Text>
              <Link to={"/"}>
                <Button variant="primary">Back</Button>
              </Link>
              <Button
                variant={isFavorite ? "danger" : "success"}
                onClick={handleFavoriteButtonClick}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
