import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './moviesSlice';

export default configureStore({
  reducer: {
    movies: movieReducer,
  },
});
