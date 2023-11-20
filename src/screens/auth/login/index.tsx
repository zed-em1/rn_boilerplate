import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationService } from '../../../services';
import { SCREEN_NAMES } from '../../../constants';
import { useTheme } from '@react-navigation/native';

interface LoginProps {}

const Login = (props: LoginProps) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}> Login</Text>
      <Button
        color={colors.primary}
        title="go to tab"
        onPress={() => NavigationService.navigate(SCREEN_NAMES.Tabs)}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {},
});
