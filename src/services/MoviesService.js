import api from './Api';

class MoviesService {
  constructor() {
    this.api = api;
  }

  getMovie(url) {
    return this.api.get('/movies/get-movie', {
      params: {
        URLMovieDB: url,
      },
    });
  }

}

export default MoviesService;
