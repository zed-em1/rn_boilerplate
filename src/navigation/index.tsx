import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './tab';
import { AuthStack, HomeStack, NotificationStack } from './stack';
import { SCREEN_NAMES } from '../constants';
import { Colors } from '../theme';

export const MainStack = () => {
  const Stack = createStackNavigator();
  const { Navigator, Screen } = Stack;
  const AppStacks = [...AuthStack, ...HomeStack, ...NotificationStack];

  return (
    <Navigator
      initialRouteName={SCREEN_NAMES.LogIn}
      screenOptions={{
        headerShown: false,
      }}
    >
      {AppStacks.map((stack) => (
        <Screen {...stack} key={stack.key} name={stack.name} />
      ))}
      <Screen component={TabNavigator} name={SCREEN_NAMES.Tabs} />
    </Navigator>
  );
};
