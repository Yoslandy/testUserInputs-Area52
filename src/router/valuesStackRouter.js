import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { Auth } from 'aws-amplify'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Home from '../screens/Home/home'

const StackClient = createStackNavigator()

export const StackValues = () => {
  const signOut = async () => {
    try {
      await Auth.signOut({ global: true })
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }

  return (
    <>
      <StackClient.Navigator>
        <StackClient.Screen
          name="ValuesStackScreen"
          component={Home}
          options={{
            headerTitle: 'CHARTS',
            headerStyle: styles.headerBackgroung,
            /* headerTintColor: myColors.WHITE, */
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',
            headerRight: () => (
              <Icon name={'logout'} color="black" size={25} onPress={signOut} style={{ marginRight: 10 }} />
            ),
          }}
        />
        {/* <StackClient.Screen
          name="valuesStackScreen"
          component={Home}
          options={{
            headerTitle: 'ASSETS',
            headerStyle: styles.headerBackgroung,
            headerTintColor: myColors.WHITE,
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <StackClient.Screen
          name="measurementsStackScreen"
          component={Measurements}
          options={{
            headerTitle: 'MEASUREMENTS',
            headerStyle: styles.headerBackgroung,
            headerTintColor: myColors.WHITE,
            headerTitleStyle: styles.headerTitle,
          }}
        /> */}
      </StackClient.Navigator>
    </>
  )
}

const styles = StyleSheet.create({
  headerBackgroung: {
    backgroundColor: '#bbb',
  },
  headerTitle: {
    fontSize: 14,
  },
})
