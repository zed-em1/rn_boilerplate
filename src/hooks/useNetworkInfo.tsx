import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { setNetworkState } from '../redux/slices/networkSlice';

export const checkNetwork = () => {
  useEffect(() => {
    NetInfo.addEventListener((state) => {
      const networkState = state.isConnected && state.isInternetReachable;
      console.warn({ networkState });

      if (networkState) {
        setNetworkState(false);
      } else if (!networkState) {
        setNetworkState(false);
      }
    });
  }, []);
};
