import { Container, MenuButton, Title } from './styles';
import Feather from '@expo/vector-icons/Feather';
import COLORS from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

export default function Header({ title }) {
  const navigation = useNavigation();

  return (
    <Container>
      <MenuButton onPress={() => navigation.openDrawer()}>
        <Feather name="menu" size={36} color={COLORS.WHITE} />
      </MenuButton>
      <Title>{title}</Title>
    </Container>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
