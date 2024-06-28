import React from 'react';
import { Link } from 'react-router-dom';

const Movie = ({ movie }) => {
  return (
    <div className="movie">
      <Link to={`/movie/${movie.id}`} className="movie-details-link">
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
        <p>Release Year: {movie.releaseYear}</p>
        <p>Genre: {movie.genre}</p>
        <p>Status: {movie.watched ? 'Watched' : 'Unwatched'}</p>
      </Link>
    </div>
  );
};

export default Movie;
