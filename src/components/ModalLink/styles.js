import styled from 'styled-components/native';
import COLORS from '../../styles/colors';
import { StyleSheet } from 'react-native';

export const BackButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${COLORS.SECONDARY};
  flex-direction: row;
  align-items: center;
`;

export const Name = styled.Text`
  color: ${COLORS.WHITE};
  margin-left: 8px;
  font-size: 18px;
  font-weight: bold;
`;

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});

export default styles;
