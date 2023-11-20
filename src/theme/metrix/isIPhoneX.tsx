import { Dimensions, Platform } from 'react-native';

export function isIPhoneXSize(dim: any) {
  return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize(dim: any) {
  return dim.height == 896 || dim.width == 896;
}

export function isIphoneX() {
  const dim = Dimensions.get('window');

  return Platform.OS === 'ios' && (isIPhoneXSize(dim) || isIPhoneXrSize(dim));
}
