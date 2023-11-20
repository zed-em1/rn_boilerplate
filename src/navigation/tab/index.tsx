import React, { useEffect, useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Notification } from '../../screens';

import { Metrix, Colors } from '../../theme';
import { Text, View, I18nManager, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
type Screen = {
  Home: React.FC;
  MyOrders: React.FC;
  Notification: React.FC;
  Profile: React.FC;
};

const Screens: Screen = { Home, Notification };
const icons = (isFocused) => {
  return {
    0: (
      <View style={styles({ isFocused }).tabItem}>
        {isFocused ? (
          <Text>Focused</Text>
        ) : (
          // <HOME
          //   style={styles({ isFocused }).tab}
          //   width={'100%'}
          //   height={'100%'}
          // />
          <Text>Not Focused</Text>
          // <HOME_EMPTY
          //   style={styles({ isFocused }).tab}
          //   width={'100%'}
          //   height={'100%'}
          // />
        )}
      </View>
    ),
    1: (
      <View style={styles({ isFocused }).tabItem}>
        {isFocused ? (
          <Text>Focused</Text>
        ) : (
          // <NOTIFY
          //   style={styles({ isFocused }).tab}
          //   width={'100%'}
          //   height={'100%'}
          // />
          <Text>Not Focused</Text>
        )}
      </View>
    ),
  };
};
export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="Home"
    >
      {Object.keys(Screens).map((screen, index) => (
        <Tab.Screen
          key={screen}
          name={screen}
          component={Screens[screen]}
          options={{
            tabBarStyle: {
              scaleX: I18nManager.isRTL ? 1 : 0,
              height: Metrix.VerticalSize(70),
              backgroundColor: Colors.White,
            },
            tabBarItemStyle: {
              justifyContent: 'center',
              alignItems: 'center',
            },

            tabBarIcon: (tabInfo) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {icons(tabInfo.focused)[index]}
                </View>
              );
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
const styles = ({ isFocused }) =>
  StyleSheet.create({
    notificationBedgeContainer: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: 'red',
      borderRadius: 10,
      paddingHorizontal: 5,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bedgeText: { color: 'white', fontSize: Metrix.customFontSize(12) },
    tab: {
      color: isFocused ? Colors.Primary : Colors.SecondaryTextColor,
    },
    tabItem: {
      width: Metrix.HorizontalSize(30),
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: isFocused ? Metrix.HorizontalSize(2) : 0,
      borderTopColor: Colors.PrimaryOpacity(),
      // borderWidth: 1,
      // borderColor: 'red',
    },
  });
