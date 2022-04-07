import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dimensions } from 'react-native'

import { StackHome } from './modelsStackRouter'
import { StackValues } from './valuesStackRouter'

const Tab_Admin = createBottomTabNavigator()
const { height } = Dimensions.get('screen')

export const HomeBottomRouter = () => {
  return (
    <Tab_Admin.Navigator
      initialRouteName="modelsStackScreen"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarLabelPosition: 'below-icon',
        /* labelStyle: { fontSize: 14 }, */
        /* activeTintColor: 'white', */
        /* inactiveTintColor: myColors.WHITE_TRANSP_MAP, */
        tabBarInactiveTintColor: '#eee',
        tabBarStyle: {
          backgroundColor: '#bbb',
          height: height * 0.08,
        },
      }}
    >
      {/* <Tab_Admin.Screen
        name="modelsBottomScreen1.1"
        component={StackHome}
        options={{
          headerShown: false,
          tabBarLabel: 'New Feature 1.1',
          tabBarIcon: ({ color, size }) => <Icon name="archive-outline" color={color} size={size} />,
        }}
      /> */}
      <Tab_Admin.Screen
        name="modelsBottomScreen"
        component={StackHome}
        options={{
          headerShown: false,
          tabBarLabel: 'Models',
          tabBarIcon: ({ color, size }) => <Icon name="state-machine" color={color} size={size} />,
        }}
      />
      <Tab_Admin.Screen
        name="valuesBottomScreen"
        component={StackValues}
        options={{
          headerShown: false,
          tabBarLabel: 'Charps',
          tabBarIcon: ({ color, size }) => <Icon name="chart-areaspline" color={color} size={size} />,
          /* tabBarBadge: ordersAdmin && Object.keys(ordersAdmin).length,
          tabBarBadgeStyle: {
            backgroundColor: myColors.WARNING_BADGE,
            color: myColors.WHITE,
            borderWidth: 0.5,
            borderColor: myColors.WHITE,
          }, */
        }}
      />
    </Tab_Admin.Navigator>
  )
}
