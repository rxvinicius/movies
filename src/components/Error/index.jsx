import { Container, Title, Message } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import COLORS from '../../styles/colors';

const Error = ({ onPressTryAgain }) => (
  <Container>
    <MaterialIcons name="error" size={70} color={COLORS.WHITE} />
    <Title>Something went wrong</Title>
    <Message onPress={onPressTryAgain}>Please try again.</Message>
  </Container>
);

Error.propTypes = {
  onPressTryAgain: PropTypes.func.isRequired,
};

export default Error;
