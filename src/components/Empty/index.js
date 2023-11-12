import { Container, Title } from './styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import COLORS from '../../styles/colors';

export default function Empty() {
  return (
    <Container>
      <MaterialCommunityIcons name="movie-off-outline" size={70} color={COLORS.WHITE} />
      <Title>Nenhum filme encontrado</Title>
    </Container>
  );
}
