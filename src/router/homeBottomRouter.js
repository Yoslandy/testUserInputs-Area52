import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StackHome } from './modelsStackRouter';
import Home from '../screens/Home/home';
import { StackValues } from './valuesStackRouter';

const Tab_Admin = createBottomTabNavigator();

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
          tabBarLabel: 'New Feature',
          tabBarIcon: ({ color, size }) => <Icon name="archive-outline" color={color} size={size} />,
        }}
      />
      <Tab_Admin.Screen
        name="valuesBottomScreen"
        component={StackValues}
        options={{
          headerShown: false,
          tabBarLabel: 'Old Feature',
          tabBarIcon: ({ color, size }) => (
            <Icon name="text-box-multiple-outline" color={color} size={size} />
          ),
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
  );
};
