import * as MoviesActionTypes from './action-types';

const initialState = {
  savedMovies: [],
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case MoviesActionTypes.SAVE_MOVIE:
      const isMovieAdded = state.savedMovies.some(movie => movie.id === action.payload.id);
      if (!isMovieAdded) {
        return { ...state, savedMovies: [...state.savedMovies, action.payload] };
      }

      return state;

    case MoviesActionTypes.REMOVE_MOVIE:
      return { ...state, savedMovies: state.savedMovies.filter(movie => movie.id !== action.payload) };

    default:
      return state;
  }
};

export default moviesReducer;
