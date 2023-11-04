import { Container, BannerItem, Title, RateContainer, Rate } from './styles';
import { MOVIE_POSTER_PATH_URL } from '../../shared/constants';
import Star from '../Star';

export default function SliderItem(params) {
  const { data, navigatePage } = params;
  const { original_title, poster_path, vote_average } = data;

  return (
    <Container activeOpacity={0.7} onPress={navigatePage}>
      <BannerItem source={{ uri: `${MOVIE_POSTER_PATH_URL}${poster_path}` }} />

      <Title numberOfLines={1}>{original_title}</Title>
      <RateContainer>
        <Star />
        <Rate>{vote_average}/10</Rate>
      </RateContainer>
    </Container>
  );
}
