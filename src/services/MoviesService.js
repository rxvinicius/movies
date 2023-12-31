import api from './Api';

class MoviesService {
  constructor() {
    this.api = api;
  }

  getMoviesList(url, page = 1) {
    return this.api.get(`/movies/get-movies-list?page=${page}`, {
      params: {
        URLMovieDB: url,
      },
    });
  }

  getMovie(id) {
    return this.api.get(`/movies/get-movie/${id}`);
  }

  getSearchMovie(name) {
    return this.api.get(`/movies/get-search-movie/${name}`);
  }
}

export default MoviesService;
