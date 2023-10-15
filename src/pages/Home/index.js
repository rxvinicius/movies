import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import Header from '../../components/Header'
import Feather from '@expo/vector-icons/Feather'
import {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  Title,
  BannerButton,
  Banner,
  SliderMovie,
} from './styles'
import COLORS from '../../styles/colors'
import SliderItem from '../../components/SliderItem'
import MoviesService from '../../services/MoviesService'
import { URL_MOVIES_DB } from '../../shared/constants'
import { arraySize } from '../../utils'

export default function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const moviesService = new MoviesService();

  const handleSelectBanner = () => {
    
  }

  useEffect(() => {
    let isActive = true

    async function getMovies() {
      const [nowData, popularData, topRatedData] = await Promise.all([
        moviesService.getMovie(URL_MOVIES_DB.now_movies),
        moviesService.getMovie(URL_MOVIES_DB.popular),
        moviesService.getMovie(URL_MOVIES_DB.top_rated),
      ]);
      setNowMovies(arraySize(10, nowData.data.results));
      setPopularMovies(arraySize(5, popularData.data.results));
      setTopMovies(arraySize(5, topRatedData.data.results));
    }
    getMovies();
  }, [])

  return (
    <Container>
      <Header title='React Prime' />

      <SearchContainer>
        <Input
          placeholder='Type a movie name'
          placeholderTextColor={COLORS.WHITE}
        />
        <SearchButton>
          <Feather name='search' size={30} color={COLORS.WHITE} />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Trending</Title>
        <BannerButton activeOpacity={0.8} onPress={handleSelectBanner}>
          <Banner
            resizeMethod='resize'
            source={{ uri: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }}
          />
        </BannerButton>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
        />

        <Title>Popular</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
        />

        <Title>Top rated</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
        />
      </ScrollView>
    </Container>
  )
}