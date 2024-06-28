import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { rateMovie, reviewMovie } from '../redux/moviesSlice';
import Rating from './Rating';
import '../styles/MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const movie = useSelector(state => state.movies.movies.find(movie => movie.id === id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (movie) {
      setReview(movie.review || '');
      setRating(movie.rating || 0);
    }
  }, [movie]);

  const handleRate = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(rateMovie({ id, rating }));
    dispatch(reviewMovie({ id, review }));
    window.alert('Review has been saved.');
    navigate('/');
  };

  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="movie-details-container">
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Release Year: {movie.releaseYear}</p>
      <p>Genre: {movie.genre}</p>
      <form onSubmit={handleSubmit}>
        <Rating rating={rating} onRate={handleRate} />
        <textarea
          className="review-textarea"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
        />
        <button type="submit" className="submit-review-button">
          {movie.review ? 'Edit Review' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default MovieDetails;
