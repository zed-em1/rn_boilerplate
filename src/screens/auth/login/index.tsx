import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationService } from '../../../services';
import { SCREEN_NAMES, TRANSLATION_KEYS } from '../../../constants';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

interface LoginProps {}

const Login = (props: LoginProps) => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>{t(TRANSLATION_KEYS.FIRST)}</Text>
      <Button
        color={colors.text}
        title="CHANGE LANGUAGE TO Spanish"
        onPress={() => i18n.changeLanguage('sp')}
      />
      <Button
        color={colors.text}
        title="CHANGE LANGUAGE To English"
        onPress={() => i18n.changeLanguage('en')}
      />
      <Button
        color={colors.text}
        title="NAVIGATE TO TABS"
        onPress={() => NavigationService.navigate(SCREEN_NAMES.Tabs)}
      />
      <Text style={styles.textStyle}> Scandit </Text>
      <View style={styles.scanditView}>
        <Button
          color={colors.text}
          title="Simple Scan"
          onPress={() =>
            NavigationService.navigate(SCREEN_NAMES.Scanner, {
              name: 'SimpleScan',
            })
          }
        />
        <Button
          color={colors.text}
          title="Selection Scan"
          onPress={() =>
            NavigationService.navigate(SCREEN_NAMES.Scanner, {
              name: 'SelectionScan',
            })
          }
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  scanditView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#000',
  },
});
