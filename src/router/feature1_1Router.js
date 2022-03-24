import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../screens/Home/home';
import HeaderComponent from '../components/Header/header';
import Models from '../components/Models/models';
import Assets from '../components/Models/assets';
import Properties from '../components/Models/properties';

const StackClient = createStackNavigator();

export const StackHome = () => {
  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <>
      {/* <HeaderComponent /> */}
      <StackClient.Navigator>
        <StackClient.Screen
          name="modelsScreen"
          component={Models}
          options={{
            headerTitle: 'MODELS',
            headerStyle: styles.headerBackgroung,
            /* headerTintColor: myColors.WHITE, */
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',
            headerRight: () => (
              <Icon name={'logout'} color="black" size={25} onPress={signOut} style={{ marginRight: 10 }} />
            ),
          }}
        />
        <StackClient.Screen
          name="assetsStackScreen"
          component={Assets}
          options={{
            headerTitle: 'ASSETS',
            headerStyle: styles.headerBackgroung,
            /* headerTintColor: myColors.WHITE, */
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <StackClient.Screen
          name="measurementsStackScreen"
          component={Properties}
          options={{
            headerTitle: 'PROPERTIES',
            headerStyle: styles.headerBackgroung,
            /* headerTintColor: myColors.WHITE, */
            headerTitleStyle: styles.headerTitle,
          }}
        />
      </StackClient.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  headerBackgroung: {
    backgroundColor: '#bbb',
  },
  headerTitle: {
    fontSize: 14,
  },
});
