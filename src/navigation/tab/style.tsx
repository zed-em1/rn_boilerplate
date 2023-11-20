import { StyleSheet } from 'react-native';
import { Metrix } from '../../service';

export const style = StyleSheet.create({
  tabBarStyle: {
    paddingBottom: Metrix.VerticalSize(10),
    paddingTop: Metrix.VerticalSize(10),
    height: Metrix.VerticalSize(60),
  },
  tabBarLabelStyle: {
    marginTop: Metrix.VerticalSize(5),
  },
});
