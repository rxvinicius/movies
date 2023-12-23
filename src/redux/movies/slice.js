import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedMovies: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    saveMovie: (state, action) => {
      const isMovieAdded = state.savedMovies.some(movie => movie.id === action.payload.id);
      if (!isMovieAdded) {
        state.savedMovies.push(action.payload);
      }
    },
    removeSavedMovie: (state, action) => {
      state.savedMovies = state.savedMovies.filter(movie => movie.id !== action.payload);
    },
  },
});

export const { saveMovie, removeSavedMovie } = moviesSlice.actions;

export default moviesSlice.reducer;
