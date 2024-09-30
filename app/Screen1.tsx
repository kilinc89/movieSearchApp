import React, {FC} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ParamListBase} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from './redux/storeInterface';
import {DrawerNavigationProp} from '@react-navigation/drawer';

type Props = {
  navigation: DrawerNavigationProp<ParamListBase>;
};

const Screen1: FC<Props> = function ({navigation}) {
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.highlight}>Screen 1 </Text>
        <Text style={styles.buttonText}>Count {count} </Text>
        <Button
          onPress={() => navigation.navigate('Screen2' as never)}
          title="screen2"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    display: 'flex',
    height: '100%',
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
    fontSize: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
  },
});

export default Screen1;
