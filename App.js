import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={false} />
      <Routes />
    </NavigationContainer>
  );
}
