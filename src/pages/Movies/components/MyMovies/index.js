import React, { PureComponent } from 'react';
import { MOVIE_POSTER_PATH_URL } from '../../../../shared/constants';
import { Container, ContentArea, Banner, Title, DeleteArea } from './styles';
import ImageNotFoundImg from '../../../../assets/image_not_found.png';
import PropTypes from 'prop-types';
import Feather from '@expo/vector-icons/Feather';
import COLORS from '../../../../styles/colors';

class MyMovies extends PureComponent {
  getPosterPath() {
    const { data } = this.props;

    if (data?.poster_path) {
      return { uri: `${MOVIE_POSTER_PATH_URL}${data?.poster_path}` };
    }
    return ImageNotFoundImg;
  }

  render() {
    const { navigatePage, removeMovie, data } = this.props;

    return (
      <Container activeOpacity={0.7}>
        <ContentArea onPress={navigatePage}>
          <Banner resizeMethod="resize" source={this.getPosterPath()} />
          <Title>{data?.title}</Title>
        </ContentArea>

        <DeleteArea>
          <Feather name="trash-2" size={24} color={COLORS.WHITE} onPress={removeMovie} />
        </DeleteArea>
      </Container>
    );
  }
}

MyMovies.propTypes = {
  data: PropTypes.object.isRequired,
  navigatePage: PropTypes.func.isRequired,
  removeMovie: PropTypes.func.isRequired,
};

export default MyMovies;
