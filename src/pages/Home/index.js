import { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import Feather from '@expo/vector-icons/Feather';
import styles, {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  Title,
  BannerButton,
  Banner,
  SliderMovie,
} from './styles';
import COLORS from '../../styles/colors';
import SliderItem from '../../components/SliderItem';
import MoviesService from '../../services/MoviesService';
import { MOVIE_POSTER_PATH_URL, URL_MOVIES_DB } from '../../shared/constants';
import { arraySize, arrayRandomIndex } from '../../utils';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const moviesService = new MoviesService();
  const [bannerMovie, setBannerMovie] = useState({});
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  function navigateDetailsMovie(id) {
    navigation.navigate('DetailsMovie', { id });
  }

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMoviesList() {
      const [nowData, popularData, topRatedData] = await Promise.all([
        moviesService.getMoviesList(URL_MOVIES_DB.now_movies),
        moviesService.getMoviesList(URL_MOVIES_DB.popular),
        moviesService.getMoviesList(URL_MOVIES_DB.top_rated),
      ])
        .catch(error => {
          console.log('error ->', error);
          // to do: https://trello.com/c/SZtcOsFN/3-implement-error-screen
        })
        .finally(() => setLoading(false));

      if (isActive) {
        setBannerMovie(nowData.data.results[arrayRandomIndex(nowData.data.results)]);
        setNowMovies(arraySize(15, nowData.data.results));
        setPopularMovies(arraySize(10, popularData.data.results));
        setTopMovies(arraySize(10, topRatedData.data.results));
      }
    }

    getMoviesList();
    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color={COLORS.WHITE} style={styles.loading} />
      </Container>
    );
  }

  return (
    <Container>
      <Header title="React Prime" />

      <SearchContainer>
        <Input placeholder="Type a movie name" placeholderTextColor={COLORS.WHITE} />
        <SearchButton>
          <Feather name="search" size={30} color={COLORS.WHITE} />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Trending</Title>
        <BannerButton activeOpacity={0.8} onPress={() => navigateDetailsMovie(bannerMovie.id)}>
          <Banner resizeMethod="resize" source={{ uri: `${MOVIE_POSTER_PATH_URL}${bannerMovie.backdrop_path}` }} />
        </BannerButton>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDetailsMovie(item.id)} />}
        />

        <Title>Popular</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDetailsMovie(item.id)} />}
        />

        <Title>Top rated</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDetailsMovie(item.id)} />}
        />
      </ScrollView>
    </Container>
  );
}
