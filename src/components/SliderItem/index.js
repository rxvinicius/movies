import { Container, BannerItem, Title, RateContainer, Rate } from './styles';
import { MOVIE_POSTER_PATH_URL } from '../../shared/constants';
import Star from '../Star';
import { getVoteAverage } from '../../utils';
import PropTypes from 'prop-types';

export default function SliderItem(params) {
  const { data, navigatePage } = params;
  const { original_title, poster_path } = data;

  return (
    <Container activeOpacity={0.7} onPress={navigatePage}>
      <BannerItem source={{ uri: `${MOVIE_POSTER_PATH_URL}${poster_path}` }} />

      <Title numberOfLines={1}>{original_title}</Title>
      <RateContainer>
        <Star />
        <Rate>{getVoteAverage(data)}</Rate>
      </RateContainer>
    </Container>
  );
}

SliderItem.propTypes = {
  data: PropTypes.object.isRequired,
  navigatePage: PropTypes.func.isRequired,
};
