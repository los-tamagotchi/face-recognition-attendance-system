import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/home-screen';

const Tab = createBottomTabNavigator();

const TabBarNavigator = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
  );
};

export default TabBarNavigator;
