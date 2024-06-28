import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMovie } from '../redux/moviesSlice';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditMovie.css';

const EditMovie = () => {
  const { id } = useParams();
  const movie = useSelector(state => state.movies.movies.find(movie => movie.id === id));
  const [title, setTitle] = useState(movie ? movie.title : '');
  const [description, setDescription] = useState(movie ? movie.description : '');
  const [releaseYear, setReleaseYear] = useState(movie ? movie.releaseYear : '');
  const [genre, setGenre] = useState(movie ? movie.genre : '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDescription(movie.description);
      setReleaseYear(movie.releaseYear);
      setGenre(movie.genre);
    }
  }, [movie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMovie({ id, title, description, releaseYear, genre, watched: movie.watched, rating: movie.rating, review: movie.review }));
    navigate('/');
  };

  return (
    <div className="edit-movie-container">
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Release Year</label>
          <input type="text" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
        </div>
        <div>
          <label>Genre</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditMovie;
