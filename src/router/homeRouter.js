import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/home';
import HeaderComponent from '../components/Header/header';

const StackClient = createStackNavigator();

export const StackHome = () => {
  return (
    <>
      <HeaderComponent />
      <StackClient.Navigator>
        <StackClient.Screen
          name="MainFeesScreen"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        {/* <StackClient.Screen
                name="AddFeesScreen"
                component={AddFeeScreen}
                options={{
                    headerTitle: 'ADD NEW FEE',
                    headerStyle: styles.headerBackgroung,
                    headerTintColor: myColors.WHITE,
                    headerTitleStyle: styles.headerTitle,
                }}
            />
            <StackClient.Screen
                name="EditFeesScreen"
                component={EditFeesScreen}
                options={{
                    headerTitle: 'UPDATE FEE',
                    headerStyle: styles.headerBackgroung,
                    headerTintColor: myColors.WHITE,
                    headerTitleStyle: styles.headerTitle,
                }}
            /> */}
      </StackClient.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  headerBackgroung: {
    backgroundColor: 'blue',
  },
  headerTitle: {
    fontFamily: 'Sofia-Regular',
    fontSize: 14,
  },
});
