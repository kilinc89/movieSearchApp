// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer as ReactNavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../Home';
import Screen1 from '../Screen1';
import Screen2 from '../Screen2';

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
const DEFAULT_TABBAR_HEIGHT = 56;

const linking = {
  prefixes: ['celebi://'],
  config: {
    /* configuration for matching screens with paths */
    screens: {
      onboardingRoot: {
        path: 'onboarding',
        initialRouteName: 'Home',
        screens: {
          Welcome: 'Home',
          Signup: 'Search',
        },
      },
    },
  },
};

const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Screen1" component={Screen1} />
      <Drawer.Screen name="Screen2" component={Screen2} />
    </Drawer.Navigator>
  );
}

const NavigationContainer: React.FC = () => {
  //   const {isLogged} = useSelector((state: RootState) => state.auth);

  return (
    <ReactNavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          fullScreenGestureEnabled: false,
        }}>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{headerShown: false}}
        />

        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
        {/* {!isLogged && (
          <>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={SignUp} />
          </>
        )} */}
      </Stack.Navigator>
    </ReactNavigationContainer>
  );
};

export default NavigationContainer;
