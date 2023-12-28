import { Component } from 'react';
import { Container, BannerItem, Title, RateContainer, Rate } from './styles';
import { MOVIE_POSTER_PATH_URL } from '../../shared/constants';
import { getVoteAverage } from '../../utils';
import Star from '../Star';
import PropTypes from 'prop-types';

class SliderItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    const { data, navigatePage } = this.props;
    const { title, poster_path } = data;

    return (
      <Container activeOpacity={0.7} onPress={navigatePage}>
        <BannerItem source={{ uri: `${MOVIE_POSTER_PATH_URL}${poster_path}` }} />

        <Title numberOfLines={1}>{title}</Title>
        <RateContainer>
          <Star />
          <Rate>{getVoteAverage(data)}</Rate>
        </RateContainer>
      </Container>
    );
  }
}

SliderItem.propTypes = {
  data: PropTypes.object.isRequired,
  navigatePage: PropTypes.func.isRequired,
};

export default SliderItem;
