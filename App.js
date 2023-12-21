import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from './src/redux/store';
import { StatusBar } from 'react-native';
import Routes from './src/routes';

export default function App() {
  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar hidden={false} />
        <Routes />
      </PersistGate>
    </Provider>
  );
}
