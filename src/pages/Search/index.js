import { useEffect, useState } from 'react';
import { Container, ListMovies } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import MoviesService from '../../services/MoviesService';
import SearchItem from './components/SearchItem';
import Loading from '../../components/Loading';

export default function Search() {
  const navigation = useNavigation();
  const route = useRoute();
  const moviesService = new MoviesService();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

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
            setMovie(response.data.results);
          }
        })
        .catch(error => {
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

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      <ListMovies
        data={movie}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <SearchItem data={item} navigatePage={() => navigateDetailsMovie(item)} />}
      />
    </Container>
  );
}
