import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';
import DetailsMovie from '../pages/DetailsMovie';
import Search from '../pages/Search';
import COLORS from '../styles/colors';
const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="DetailsMovie" component={DetailsMovie} options={{ headerShown: false }} />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: true,
          title: 'Your search',
          headerTintColor: COLORS.WHITE,
          headerTitleStyle: {
            color: COLORS.WHITE,
          },
          headerStyle: { backgroundColor: COLORS.SECONDARY },
        }}
      />
    </Stack.Navigator>
  );
}
