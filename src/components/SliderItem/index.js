import {
  Container,
  BannerItem,
  Title,
  RateContainer,
  Rate,
} from './styles'
import COLORS from '../../styles/colors'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function SliderItem(params) {
  const { data } = params;
  const { original_title, poster_path, vote_average } = data;
  const imageURL = 'https://image.tmdb.org/t/p/original';

  return (
    <Container activeOpacity={0.7}>
      <BannerItem
        source={{ uri: `${imageURL}/${poster_path}` }}
      />

      <Title numberOfLines={1}>{original_title }</Title>
      <RateContainer>
        <Ionicons name='md-star' size={12} color={COLORS.YELLOW} />
        <Rate>{vote_average}/10</Rate>
      </RateContainer>
    </Container>
  );
}