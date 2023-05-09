export const ProfileView = ({ user, movies }) => {
    return (
        <div>
            <div>{user.Username}</div>
            <div>{user.FavoriteMovies}</div>
        </div>
        //Loop over movies to get ID's and show the cards
        
    )
}
