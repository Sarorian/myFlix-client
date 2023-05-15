import React from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { UpdateProfileView } from "../update-profile-view/update-profile-view";

export const ProfileView = ({ user, movies, token }) => {
  
  const handleDeleteAccount = () => {
    fetch(`/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
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
        <UpdateProfileView user={user} token={token} />
      </div>
      <div>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
};