import { useState, useEffect } from 'react';
import { ScrollView, Modal } from 'react-native';
import {
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
} from './styles';
import COLORS from '../../styles/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import MoviesService from '../../services/MoviesService';
import { MOVIE_POSTER_PATH_URL } from '../../shared/constants';
import Stars from 'react-native-stars';
import { Genres, Loading, ModalLink, Star } from '../../components';
import { getVoteAverage } from '../../utils';

export default function DetailsMovie() {
  const navigation = useNavigation();
  const route = useRoute();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const moviesService = new MoviesService();

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovie() {
      moviesService
        .getMovie(route.params?.id)
        .then(response => {
          if (isActive) setMovie(response.data);
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

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color={COLORS.WHITE} />
        </HeaderButton>
        <HeaderButton>
          <Ionicons name="bookmark" size={28} color={COLORS.WHITE} />
        </HeaderButton>
      </Header>

      <Banner source={{ uri: `${MOVIE_POSTER_PATH_URL}${movie.backdrop_path}` }} />

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
    </Container>
  );
}
