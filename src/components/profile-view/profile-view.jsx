import React from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { UpdateProfileView } from "../update-profile-view/update-profile-view";


export const ProfileView = ({ user, movies, token }) => {
  return (
    <div>
      <div>{user.Username}</div>
      <div>
        <div>Favorite Movies</div>
        <div>
          {user.FavoriteMovies.map((movieId) => {
            const movie = movies.find((m) => m.id === movieId);
            return <MovieCard key={movieId} movie={movie} smallView={true} />;
          })}
        </div>
      </div>
      <div>
        <h3>Update Profile</h3>
        <UpdateProfileView user={user} token={token}/>
      </div>
    </div>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
};