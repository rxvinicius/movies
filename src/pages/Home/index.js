import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Container, SearchContainer, Input, SearchButton, Title, BannerButton, Banner, SliderMovie } from './styles';
import { Header, SliderItem, Loading } from '../../components';
import { MOVIE_POSTER_PATH_URL, URL_MOVIES_DB } from '../../shared/constants';
import { arraySize, arrayRandomIndex } from '../../utils';
import COLORS from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import MoviesService from '../../services/MoviesService';
import Feather from '@expo/vector-icons/Feather';

export default function Home() {
  const navigation = useNavigation();
  const moviesService = new MoviesService();
  const [bannerMovie, setBannerMovie] = useState({});
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [findMovieInput, setFindMovieInput] = useState('');

  function navigateDetailsMovie(id) {
    navigation.navigate('DetailsMovie', { id });
  }

  const handleSearchMovie = () => {
    if (findMovieInput && findMovieInput.trim() !== '') {
      navigation.navigate('Search', { name: findMovieInput });
      setFindMovieInput('');
    }
  };

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
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      <Header title="React Prime" />

      <SearchContainer>
        <Input
          value={findMovieInput}
          placeholder="Type a movie name"
          placeholderTextColor={COLORS.WHITE}
          onChangeText={text => setFindMovieInput(text)}
        />
        <SearchButton onPress={handleSearchMovie}>
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
