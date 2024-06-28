import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await api.get('/movies');
  return response.data;
});

export const addMovie = createAsyncThunk('movies/addMovie', async (movie) => {
  const response = await api.post('/movies', movie);
  return response.data;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async (movie) => {
  const response = await api.put(`/movies/${movie.id}`, movie);
  return response.data;
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  await api.delete(`/movies/${id}`);
  return id;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleWatched(state, action) {
      const movie = state.movies.find(movie => movie.id === action.payload);
      if (movie) {
        movie.watched = !movie.watched;
      }
    },
    rateMovie(state, action) {
      const { id, rating } = action.payload;
      const movie = state.movies.find(movie => movie.id === id);
      if (movie) {
        movie.rating = rating;
      }
    },
    reviewMovie(state, action) {
      const { id, review } = action.payload;
      const movie = state.movies.find(movie => movie.id === id);
      if (movie) {
        movie.review = review;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload; // Ensure state is replaced, not appended
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(movie => movie.id === action.payload.id);
        state.movies[index] = action.payload;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(movie => movie.id !== action.payload);
      });
  },
});

export const { toggleWatched, rateMovie, reviewMovie } = movieSlice.actions;

export default movieSlice.reducer;
