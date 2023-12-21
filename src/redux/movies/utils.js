export const getSavedMovies = rootReducer => rootReducer.moviesReducer.savedMovies;

export const hasMovie = (rootReducer, movieId) =>
  rootReducer.moviesReducer.savedMovies.some(movie => movie.id === movieId);
