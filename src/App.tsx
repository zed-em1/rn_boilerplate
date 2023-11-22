/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import './i18n/config/i18n.config';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { ENV, API_URL } from '@env';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import { NavigationService } from './services';
import { MainStack } from './navigation';
import { SCREEN_NAMES } from './constants';
import { Home, Login, Notification } from './screens';
import { createStackNavigator } from '@react-navigation/stack';
import { Theme } from './theme';
import { AsyncClient } from './utills';

function App(): JSX.Element {
  const navigationRef = useNavigationContainerRef();
  console.log(SCREEN_NAMES);
  React.useEffect(() => {
    NavigationService.setTopLevelNavigator(navigationRef);
  }, []);
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createStackNavigator();

  console.log('ENV', ENV, API_URL);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer
        ref={navigationRef}
        theme={isDarkMode ? Theme.dark : Theme.light}
      >
        <MainStack />
        {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="LogIn" component={Login} />
      </Stack.Navigator> */}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
