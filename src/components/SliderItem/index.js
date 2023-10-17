import {
  Container,
  BannerItem,
  Title,
  RateContainer,
  Rate,
} from './styles'
import COLORS from '../../styles/colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { MOVIE_POSTER_PATH_URL } from '../../shared/constants';

export default function SliderItem(params) {
  const { data } = params;
  const { original_title, poster_path, vote_average } = data;

  return (
    <Container activeOpacity={0.7}>
      <BannerItem
        source={{ uri: `${MOVIE_POSTER_PATH_URL}${poster_path}` }}
      />

      <Title numberOfLines={1}>{original_title}</Title>
      <RateContainer>
        <Ionicons name='md-star' size={12} color={COLORS.YELLOW} />
        <Rate>{vote_average}/10</Rate>
      </RateContainer>
    </Container>
  );
}