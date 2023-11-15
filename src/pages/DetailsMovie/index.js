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
import { setSavedMovie, hasMovie, removeSavedMovie } from '../../utils/moviesStorage';

export default function DetailsMovie() {
  const navigation = useNavigation();
  const moviesService = new MoviesService();
  const route = useRoute();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [favoritedMovie, setFavoritedMovie] = useState(false);

  const BackButton = () => {
    return (
      <>
        <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color={COLORS.WHITE} />
        </HeaderButton>
      </>
    );
  };

  const handleFavoriteMovie = async () => {
    const found = await hasMovie(movie.id);
    setFavoritedMovie(!found);

    if (found) {
      await removeSavedMovie(movie.id);
    } else {
      await setSavedMovie(movie);
    }
  };

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovie() {
      moviesService
        .getMovie(route.params?.id)
        .then(async response => {
          const { data } = response;

          if (isActive) {
            setMovie(data);
            setFavoritedMovie(await hasMovie(data.id));
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
  }, []);

  const render = () => {
    if (error) {
      return (
        <>
          <Header>
            <BackButton />
          </Header>
          <Error />
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
