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

export default function Home() {
  const handleSelectBanner = () => {

  }

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
          data={[1, 2, 3, 4]}
          renderItem={({ item }) => <SliderItem />}
        />

        <Title>Popular</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4]}
          renderItem={({ item }) => <SliderItem />}
        />

        <Title>Top rated</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4]}
          renderItem={({ item }) => <SliderItem />}
        />
      </ScrollView>
    </Container>
  )
}