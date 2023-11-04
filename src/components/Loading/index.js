import { ActivityIndicator } from 'react-native';
import styles from './styles';
import COLORS from '../../styles/colors';

export default function Loading() {
  return <ActivityIndicator size="large" color={COLORS.WHITE} style={styles.loading} />;
}
