import { Container, Title, Message } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from '../../styles/colors';

export default function Error() {
  return (
    <Container>
      <MaterialIcons name="error" size={70} color={COLORS.WHITE} />
      <Title>Something went wrong</Title>
      <Message>Please try again.</Message>
    </Container>
  );
}
