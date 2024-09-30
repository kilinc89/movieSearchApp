import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MovieListScreen from '../screens/MovieListScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

export type RootStackParamList = {
  Movies: undefined;
  Details: { imdbID: string };
  Favorites: undefined;
};

const Drawer = createDrawerNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Movies">
        <Drawer.Screen name="Movies" component={MovieListScreen} />
        <Drawer.Screen name="Favorites" component={FavoritesScreen} />
        <Drawer.Screen name="Details" component={MovieDetailScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
