import { Header, Empty } from '../../components';
import { Container, ListMovies } from './styles';
import { useNavigation } from '@react-navigation/native';
import { MyMovies } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { getSavedMovies } from '../../redux/movies/utils';
import { removeSavedMovie } from '../../redux/movies/actions';

export default function Movies() {
  const pageTitle = 'Movies';
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const movies = useSelector(getSavedMovies);

  function navigateDetailsMovie(item) {
    if (item.release_date !== '') {
      navigation.navigate('DetailsMovie', { id: item.id });
    }
  }

  const handleRemoveMovie = movie => {
    dispatch(removeSavedMovie(movie.id));
  };

  const render = () => {
    if (movies.length === 0) {
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
