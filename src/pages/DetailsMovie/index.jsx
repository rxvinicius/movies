import { useState, useEffect } from 'react';
import { ScrollView, Modal } from 'react-native';
import styles, {
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description,
  ImageNotFound,
  TextNotFound,
} from './styles';
import COLORS from '../../styles/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import MoviesService from '../../services/MoviesService';
import { MOVIE_POSTER_PATH_URL } from '../../shared/constants';
import Stars from 'react-native-stars';
import { Error, Genres, Loading, ModalLink, Star } from '../../components';
import { getVoteAverage } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { saveMovie, removeSavedMovie } from '../../redux/movies/slice';
import { hasMovie } from '../../redux/movies/selectors';

export default function DetailsMovie() {
  const route = useRoute();
  const navigation = useNavigation();
  const moviesService = new MoviesService();
  const dispatch = useDispatch();
  const favoritedMovie = useSelector(state => hasMovie(state, route.params?.id));
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openLink, setOpenLink] = useState(false);

  const BackButton = () => {
    return (
      <>
        <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color={COLORS.WHITE} />
        </HeaderButton>
      </>
    );
  };

  const handleFavoriteMovie = () => {
    if (favoritedMovie) {
      dispatch(removeSavedMovie(movie.id));
    } else {
      dispatch(saveMovie(movie));
    }
  };

  const initScreen = () => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovie() {
      setLoading(true);
      setError(false);

      moviesService
        .getMovie(route.params?.id)
        .then(response => {
          if (isActive) {
            setMovie(response.data);
          }
        })
        .catch(error => {
          console.log('Error', error);
          setError(true);
        })
        .finally(() => setLoading(false));
    }

    if (isActive) getMovie();

    return () => {
      isActive = false;
      ac.abort();
    };
  };

  useEffect(() => initScreen(), []);

  const render = () => {
    if (error) {
      return (
        <>
          <Header>
            <BackButton />
          </Header>
          <Error onPressTryAgain={initScreen} />
        </>
      );
    }

    if (loading) return <Loading />;

    return (
      <>
        <Header>
          <BackButton />
          <HeaderButton onPress={handleFavoriteMovie}>
            <Ionicons name={`bookmark${favoritedMovie ? '' : '-outline'}`} size={28} color={COLORS.WHITE} />
          </HeaderButton>
        </Header>

        {movie.backdrop_path ? (
          <Banner source={{ uri: `${MOVIE_POSTER_PATH_URL}${movie.backdrop_path}` }} style={styles.banner} />
        ) : (
          <ImageNotFound style={styles.banner}>
            <TextNotFound>IMAGE NOT FOUND</TextNotFound>
          </ImageNotFound>
        )}

        {movie?.homepage && (
          <ButtonLink onPress={() => setOpenLink(true)}>
            <Feather name="link" size={24} color={COLORS.WHITE} />
          </ButtonLink>
        )}

        <Title numberOfLines={2}>{movie.title}</Title>

        <ContentArea>
          <Stars
            default={movie.vote_average}
            count={10}
            half={true}
            starSize={20}
            fullStar={<Star size="large" />}
            emptyStar={<Star size="large" variant="outline" />}
            halfStar={<Star size="large" variant="half" />}
            disabled={true}
          />
          <Rate>{getVoteAverage(movie)}</Rate>
        </ContentArea>

        <ListGenres
          data={movie?.genres}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Genres data={item} />}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Title>Description</Title>
          <Description>{movie.overview ? movie.overview : `description wasn't found`}</Description>
        </ScrollView>

        <Modal animationType="slide" transparent={true} visible={openLink}>
          <ModalLink link={movie?.homepage} title={movie?.title} closeModal={() => setOpenLink(false)} />
        </Modal>
      </>
    );
  };

  return <Container>{render()}</Container>;
}
