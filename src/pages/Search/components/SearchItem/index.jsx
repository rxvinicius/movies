import { MOVIE_POSTER_PATH_URL } from '../../../../shared/constants';
import { Container, Banner, Title, RateContainer, Rate } from './styles';
import ImageNotFoundImg from '../../../../assets/image_not_found.png';
import Star from '../../../../components/Star';
import PropTypes from 'prop-types';
import { getVoteAverage } from '../../../../utils';

export default function SearchItem(props) {
  const { data, navigatePage } = props;

  function getPosterPath() {
    if (data?.backdrop_path) {
      return { uri: `${MOVIE_POSTER_PATH_URL}${data?.backdrop_path}` };
    }
    return ImageNotFoundImg;
  }

  return (
    <Container activeOpacity={0.7} onPress={navigatePage}>
      <Banner resizeMethod="resize" source={getPosterPath()} />
      <Title>{data?.title}</Title>

      <RateContainer>
        <Star />
        <Rate>{getVoteAverage(data)}</Rate>
      </RateContainer>
    </Container>
  );
}

SearchItem.propTypes = {
  data: PropTypes.object,
  navigatePage: PropTypes.func,
};
