import styles, { BackButton, Name } from './styles';
import Feather from '@expo/vector-icons/Feather';
import COLORS from '../../styles/colors';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';

export default function ModalLink({ link, title, closeModal }) {
  return (
    <>
      <View>
        <BackButton onPress={closeModal}>
          <Feather name='x' size={35} color={COLORS.WHITE} />
          <Name numberOfLines={1}>{title}</Name>
        </BackButton>
      </View>

      <WebView
        source={{ uri: link }}
        style={styles.webview}
      />
    </>
  );
}