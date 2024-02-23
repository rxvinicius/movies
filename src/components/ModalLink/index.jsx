import styles, { BackButton, Name } from './styles';
import Feather from '@expo/vector-icons/Feather';
import COLORS from '../../styles/colors';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

const ModalLink = ({ link, title, closeModal }) => (
  <>
    <BackButton onPress={closeModal}>
      <Feather name="x" size={35} color={COLORS.WHITE} />
      <Name numberOfLines={1}>{title}</Name>
    </BackButton>

    <WebView source={{ uri: link }} style={styles.webview} />
  </>
);

ModalLink.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ModalLink;
