import { useTheme } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { TRANSLATION_KEYS } from '../../constants';

const Home = () => {
  const { colors, dark } = useTheme();
  const { t } = useTranslation();
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
        {t(
          TRANSLATION_KEYS.This_is_demo_of_default_dark_light_theme_using_navigation
        )}
      </Text>
    </View>
  );
};

export default Home;
