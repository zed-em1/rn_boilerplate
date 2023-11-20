import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';

const Home = () => {
  const { colors, dark } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.notification,
      }}
    >
      <Text style={{ color: colors.text }}>
        This is demo of default dark/light theme using navigation.
      </Text>
    </View>
  );
};

export default Home;
