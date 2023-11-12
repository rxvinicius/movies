import { useEffect, useState } from 'react';
import { Container, ListMovies } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import MoviesService from '../../services/MoviesService';
import { Loading, Error, Empty } from '../../components';
import SearchItem from './components/SearchItem';

export default function Search() {
  const navigation = useNavigation();
  const route = useRoute();
  const moviesService = new MoviesService();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noMovies, setNoMovies] = useState(false);

  function navigateDetailsMovie(item) {
    if (item.release_date !== '') {
      navigation.navigate('DetailsMovie', { id: item.id });
    }
  }

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getSearchMovie() {
      const movieName = route?.params?.name;
      moviesService
        .getSearchMovie(movieName)
        .then(response => {
          if (isActive) {
            const { results } = response.data;
            setMovie(results);
            setNoMovies(results && results.length === 0);
          }
        })
        .catch(error => {
          setError(true);
          console.log('error ->', error);
        })
        .finally(() => setLoading(false));
    }

    if (isActive) {
      getSearchMovie();
    }

    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  const render = () => {
    if (error) return <Error />;
    if (loading) return <Loading />;
    if (noMovies) return <Empty />;

    return (
      <ListMovies
        data={movie}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <SearchItem data={item} navigatePage={() => navigateDetailsMovie(item)} />}
      />
    );
  };

  return <Container>{render()}</Container>;
}
