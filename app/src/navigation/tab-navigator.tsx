import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/home-screen';
import { VideoStream } from '../screens/streaming/streaming-screen';

const Tab = createBottomTabNavigator();

const TabBarNavigator = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Stream" component={VideoStream} />
      </Tab.Navigator>
  );
};

export default TabBarNavigator;
