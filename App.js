import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './src/redux/store';
import Routes from './src/routes';
import { setBackgroundColorAsync } from 'expo-system-ui';
import COLORS from './src/styles/colors';

export default function App() {
  setBackgroundColorAsync(COLORS.SECONDARY);
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar hidden={false} />
        <Routes />
      </PersistGate>
    </Provider>
  );
}
