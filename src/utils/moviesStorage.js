import AsyncStorage from '@react-native-async-storage/async-storage';
const MOVIE_STORAGE = '@movies';

const getSavedMovies = async () => {
  const myMovies = await AsyncStorage.getItem(MOVIE_STORAGE);
  return JSON.parse(myMovies) || [];
};

const setSavedMovie = async newMovie => {
  if (!newMovie) return;
  let savedMovies = await getSavedMovies();
  const hasMovie = savedMovies.some(movie => movie.id === newMovie.id);
  if (hasMovie) return;
  savedMovies.push(newMovie);
  await AsyncStorage.setItem(MOVIE_STORAGE, JSON.stringify(savedMovies));
};

const removeSavedMovie = async id => {
  if (!id) return;
  const savedMovies = await getSavedMovies();
  const myMovies = savedMovies.filter(movie => movie.id !== id);
  await AsyncStorage.setItem(MOVIE_STORAGE, JSON.stringify(myMovies));
  return myMovies;
};

const hasMovie = async id => {
  if (!id) return;
  const savedMovies = await getSavedMovies();
  return savedMovies.some(movie => movie.id === id);
};

module.exports = {
  getSavedMovies,
  setSavedMovie,
  removeSavedMovie,
  hasMovie,
};
