import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { MainNavigator } from './main-navigator';
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export const Root = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'none',
      }}>
      <Stack.Screen name="main" component={MainNavigator} />
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <Root/>
    </QueryClientProvider>
  );
};