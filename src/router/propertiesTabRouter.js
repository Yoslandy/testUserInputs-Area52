import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Properties from '../components/Models/properties'
import Properties_Metrics_Transf from '../components/Models/properties_Metrics_Transf'

const Tab = createMaterialTopTabNavigator()

const PropertiesTabRouter = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        //activeTintColor: myColors.WHITE,
        inactiveTintColor: '#eee',
        /* indicatorStyle: {
          backgroundColor: myColors.WHITE,
        }, */
        style: [
          {
            backgroundColor: '#ccc',
            hieght: 30,
          },
        ],

        /* tabStyle: {
          padding: 0,
          paddingVertical: 5,
        }, */
        /* showIcon: true, */
      }}
    >
      <Tab.Screen
        name="Attr_Measur"
        component={Properties}
        options={{
          tabBarLabel: 'Modifiable',
          /* tabBarIcon: ({ color, size }) => (
            <Badge
              value={pending}
              badgeStyle={{
                backgroundColor: myColors.BLUE_SECUNDARY,
                borderWidth: 0.5,
                width: getWidth(pending),
              }}
            />
          ), */
        }}
      />
      <Tab.Screen
        name="Metrics_Transf"
        component={Properties_Metrics_Transf}
        options={{
          tabBarLabel: 'Unmodifiable',
          /* tabBarIcon: ({ color, size }) => (
            <Badge
              value={pending}
              badgeStyle={{
                backgroundColor: myColors.BLUE_SECUNDARY,
                borderWidth: 0.5,
                width: getWidth(pending),
              }}
            />
          ), */
        }}
      />
    </Tab.Navigator>
  )
}

export default PropertiesTabRouter
