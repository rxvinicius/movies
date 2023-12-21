import * as MoviesActionTypes from './action-types';

export const saveMovie = movie => ({ type: MoviesActionTypes.SAVE_MOVIE, payload: movie });

export const removeSavedMovie = movieId => ({ type: MoviesActionTypes.REMOVE_MOVIE, payload: movieId });
