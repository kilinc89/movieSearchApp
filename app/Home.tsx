/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from '../app/redux/store';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {decrement, increment} from '../app/redux/reducers/counterReducer';
import {AppDispatch, RootState} from '../app/redux/storeInterface';
import {fetchUsers} from '../app/redux/reducers/authReducer';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';

type SectionProps = PropsWithChildren<{
  title: string;
  navigation: DrawerNavigationProp<ParamListBase, string>;
}>;

function Section({
  children,
  title,
  navigation,
}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const count = useSelector((state: RootState) => state.counter.value);
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch: AppDispatch = useDispatch();

  const getUsers = () => {
    dispatch(fetchUsers());
  };

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>

      <Button onPress={() => navigation.openDrawer()} title="open drawer" />

      <Button onPress={() => navigation.navigate('Screen1')} title="screen1" />

      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(decrement())}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{count}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(increment())}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <Button onPress={getUsers} title="GET USERS" />
      {users?.map(user => (
        <View key={user.id}>
          <Text style={styles.text}>{user.name}</Text>
        </View>
      ))}
    </View>
  );
}

function Home({navigation}: {navigation: DrawerNavigationProp<ParamListBase>}) {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Step One" navigation={navigation}>
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this
              screen and then come back to see your edits.
            </Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    backgroundColor: 'gray',
    padding: 30,
    borderRadius: 10,
    margin: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  text: {
    fontSize: 20,
  },
});

export default Home;
