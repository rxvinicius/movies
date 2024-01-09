import { useEffect, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { Container, SearchContainer, Input, SearchButton, Title, BannerButton, Banner, SliderMovie } from './styles';
import { Header, SliderItem, Loading, Error } from '../../components';
import * as SliderItemStyles from '../../components/SliderItem/styles';
import { MOVIE_POSTER_PATH_URL, URL_MOVIES_DB } from '../../shared/constants';
import { arraySize, removeDuplicates } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import MoviesService from '../../services/MoviesService';
import Feather from '@expo/vector-icons/Feather';
import COLORS from '../../styles/colors';
import Carousel from 'react-native-reanimated-carousel';

export default function Home() {
  const title = 'React Prime';
  const widthCarousel = Dimensions.get('window').width;
  const { navigate } = useNavigation();
  const moviesService = new MoviesService();
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [bannerMovies, setBannerMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [findMovieInput, setFindMovieInput] = useState('');
  const [pageNowMovies, setPageNowMovies] = useState(1);
  const [pagePopularMovies, setPagePopularMovies] = useState(2);
  const [pageTopRated, setPageTopRated] = useState(1);

  const navigateDetailsMovie = id => navigate('DetailsMovie', { id });

  const handleSearchMovie = () => {
    if (findMovieInput && findMovieInput.trim() !== '') {
      navigate('Search', { name: findMovieInput });
      setFindMovieInput('');
    }
  };

  async function getMovies(url, page) {
    return moviesService.getMoviesList(url, page);
  }

  const handleError = error => {
    if (error) {
      setError(true);
      console.log('error ->', error);
    } else {
      setError(false);
    }
  };

  const renderItem = ({ item }) => (
    <SliderItem key={item.id} data={item} navigatePage={() => navigateDetailsMovie(item.id)} />
  );

  const ListFooterComponent = () => (
    <SliderItemStyles.Container>
      <Loading />
    </SliderItemStyles.Container>
  );

  const onEndReachedNow = () => {
    const page = pageNowMovies + 1;
    setPageNowMovies(page);
    getMovies(URL_MOVIES_DB.now_movies, page)
      .then(response => {
        const uniqueMovies = removeDuplicates(nowMovies, response.data.results);
        setNowMovies(movies => [...movies, ...uniqueMovies]);
      })
      .catch(error => handleError(error));
  };

  const onEndReachedPopular = () => {
    const page = pagePopularMovies + 1;
    setPagePopularMovies(page);
    getMovies(URL_MOVIES_DB.popular, page)
      .then(response => {
        const uniqueMovies = removeDuplicates(popularMovies, response.data.results);
        setPopularMovies(movies => [...movies, ...uniqueMovies]);
      })
      .catch(error => handleError(error));
  };

  const onEndReachedTopRated = () => {
    const page = pageTopRated + 1;
    setPageTopRated(page);
    getMovies(URL_MOVIES_DB.top_rated, page)
      .then(response => {
        const uniqueMovies = removeDuplicates(topMovies, response.data.results);
        setTopMovies(movies => [...movies, ...uniqueMovies]);
      })
      .catch(error => handleError(error));
  };

  const initScreen = () => {
    let isActive = true;
    const ac = new AbortController();

    async function getMoviesList() {
      setLoading(true);
      handleError(false);

      const [nowData, popularData, topRatedData, bannerData] = await Promise.all([
        getMovies(URL_MOVIES_DB.now_movies, pageNowMovies),
        getMovies(URL_MOVIES_DB.popular, pagePopularMovies),
        getMovies(URL_MOVIES_DB.top_rated, pageTopRated),
        getMovies(URL_MOVIES_DB.popular),
      ])
        .catch(error => handleError(error))
        .finally(() => setLoading(false));

      if (isActive) {
        setNowMovies(nowData.data.results);
        setPopularMovies(popularData.data.results);
        setTopMovies(topRatedData.data.results);
        setBannerMovies(arraySize(10, bannerData.data.results));
      }
    }

    getMoviesList();

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
          <Header title={title} />
          <Error onPressTryAgain={initScreen} />
        </>
      );
    }

    if (loading) return <Loading />;

    return (
      <>
        <Header title={title} />

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
          <Carousel
            loop
            width={widthCarousel}
            height={widthCarousel / 2}
            autoPlay={true}
            data={bannerMovies}
            scrollAnimationDuration={2000}
            renderItem={({ item }) => (
              <BannerButton activeOpacity={0.8} onPress={() => navigateDetailsMovie(item.id)}>
                <Banner resizeMethod="resize" source={{ uri: `${MOVIE_POSTER_PATH_URL}${item.backdrop_path}` }} />
              </BannerButton>
            )}
          />

          <SliderMovie
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={nowMovies}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListFooterComponent={ListFooterComponent}
            onEndReached={onEndReachedNow}
            onEndReachedThreshold={0.1}
          />

          <Title>Popular</Title>
          <SliderMovie
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={popularMovies}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListFooterComponent={ListFooterComponent}
            onEndReached={onEndReachedPopular}
            onEndReachedThreshold={0.1}
          />

          <Title>Top rated</Title>
          <SliderMovie
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={topMovies}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListFooterComponent={ListFooterComponent}
            onEndReached={onEndReachedTopRated}
            onEndReachedThreshold={0.1}
          />
        </ScrollView>
      </>
    );
  };

  return <Container>{render()}</Container>;
}
