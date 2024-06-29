import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import HomeScreen from '../screens/home/home-screen';
import TabBarNavigator from './tab-navigator';

export enum MainStackScreens {
  'Tab' = 'Tab',
}

const { Tab } = MainStackScreens;

export type MainStackParamList = {
  [Tab]: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen name={Tab} component={TabBarNavigator} />
      </Stack.Group>
    </Stack.Navigator>
  );
};