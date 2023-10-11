import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../pages/Home'
import Movies from '../pages/Movies'
import StackRoutes from './StackRoutes'
import COLORS from '../styles/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './styles'

const Drawer = createDrawerNavigator()

const DrawerIcon = (props, screen) => {
  const { focused, size, color } = props

  function iconName() {
    if (screen == 'Home')
      return focused ? 'movie-open' : 'movie-outline'

    return focused ? 'archive' : 'archive-outline'
  }

  return (
    <MaterialCommunityIcons
      name={iconName()}
      size={size}
      color={color}
    />
  )
}

export default function Routes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: styles.drawerStyle,
        drawerActiveBackgroundColor: COLORS.PRIMARY,
        drawerActiveTintColor: COLORS.WHITE,
        drawerInactiveTintColor: COLORS.WHITE,
      }}
    >
      <Drawer.Screen
        name='HomeDrawer'
        component={StackRoutes}
        options={{
          title: 'Home',
          drawerIcon: (props) => DrawerIcon(props, 'Home')
        }}
      />
      <Drawer.Screen
        name='Movies'
        component={Movies}
        options={{
          title: 'Movies',
          drawerIcon: (props) => DrawerIcon(props, 'Movies')
        }}
      />
    </Drawer.Navigator>
  )
}