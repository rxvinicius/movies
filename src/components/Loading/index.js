import { ActivityIndicator } from 'react-native';
import styles from './styles';
import COLORS from '../../styles/colors';

const Loading = () => <ActivityIndicator size="large" color={COLORS.WHITE} style={styles.loading} />;

export default Loading;
