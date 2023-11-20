import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface NotificationProps {}

const Notification = (props: NotificationProps) => {
  return (
    <View style={styles.container}>
      <Text>Notification</Text>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {},
});
