import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, deleteMovie, toggleWatched } from '../redux/moviesSlice';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/MovieList.css';

const MovieList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector(state => state.movies.movies);
  const loading = useSelector(state => state.movies.loading);
  const error = useSelector(state => state.movies.error);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movie-list-container">
      <h2>Movie List</h2>
      <Link to="/add" className="add-movie-link">Add Movie</Link>
      <div className="movie-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <p>Release Year: {movie.releaseYear}</p>
            <p>Genre: {movie.genre}</p>
            <p>Status: {movie.watched ? 'Watched' : 'Unwatched'}</p>
            <div className="card-actions">
              <Link to={`/edit/${movie.id}`} className="edit-link">Edit</Link>
              <button className="delete-button" onClick={() => dispatch(deleteMovie(movie.id))}>Delete</button>
              <Link to={`/movies/${movie.id}`} className="details-button">More Details</Link>
            </div>
            <div className="watch-status">
              <label>
                <input 
                  type="checkbox" 
                  checked={movie.watched} 
                  onChange={() => dispatch(toggleWatched(movie.id))} 
                />
                Mark as Watched
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
