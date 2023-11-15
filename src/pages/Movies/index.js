import { useEffect, useState } from 'react';
import { Header, Loading, Empty } from '../../components';
import { Container, ListMovies } from './styles';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getSavedMovies, removeSavedMovie } from '../../utils/moviesStorage';
import { MyMovies } from './components';

export default function Movies() {
  const pageTitle = 'Movies';
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noMovies, setNoMovies] = useState(false);

  function navigateDetailsMovie(item) {
    if (item.release_date !== '') {
      navigation.navigate('DetailsMovie', { id: item.id });
    }
  }

  async function handleRemoveMovie(item) {
    const result = await removeSavedMovie(item.id);
    setMovies(result);
    setNoMovies(result && result.length === 0);
  }

  useEffect(() => {
    setLoading(true);
    let isActive = true;
    const ac = new AbortController();

    async function getMovies() {
      const data = await getSavedMovies();
      setMovies(data);
      setNoMovies(data.length === 0);
      setLoading(false);
    }

    if (isActive) {
      getMovies();
    }

    return () => {
      isActive = false;
      ac.abort();
    };
  }, [isFocused]);

  const render = () => {
    if (loading) return <Loading />;

    if (noMovies) {
      return (
        <>
          <Header title={pageTitle} />
          <Empty />
        </>
      );
    }

    return (
      <>
        <Header title={pageTitle} />

        <ListMovies
          data={movies}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MyMovies
              data={item}
              navigatePage={() => navigateDetailsMovie(item)}
              removeMovie={() => handleRemoveMovie(item)}
            />
          )}
        />
      </>
    );
  };

  return <Container>{render()}</Container>;
}
