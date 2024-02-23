import { Container, Name } from './styles';
import PropTypes from 'prop-types';

const Genres = ({ data }) => (
  <Container>
    <Name>{data.name}</Name>
  </Container>
);

Genres.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Genres;
