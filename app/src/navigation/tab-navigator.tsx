import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/home-screen';
import Attendance from '../screens/attendance-records.tsx/attendance';
import { VideoStream } from '../screens/streaming/streaming-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const TabBarNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#4849A1',
        tabBarInactiveTintColor: '#808080',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Stream" 
        component={VideoStream}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="camera-wireless" size={size} color={color} /> 
          )
        }}
      />
      <Tab.Screen 
        name="Reportes" 
        component={Attendance} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="file-table" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBarNavigator;