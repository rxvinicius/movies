import { Container, Title } from './styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import COLORS from '../../styles/colors';

const Empty = () => (
  <Container>
    <MaterialCommunityIcons name="movie-off-outline" size={70} color={COLORS.WHITE} />
    <Title>No movies found</Title>
  </Container>
);

export default Empty;
