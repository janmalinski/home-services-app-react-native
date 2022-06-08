import { Dimensions, Platform, ViewStyle } from 'react-native';

import { palette } from './palette';

const iphoneXHeight = 812;
const iphoneXMaxHeight = 896;

export const isIos = () => Platform.OS === 'ios';

export const isIphoneX = (): boolean => {
  const { height, width } = Dimensions.get('window');
  return (
    isIos() &&
    (height === iphoneXHeight ||
      width === iphoneXHeight ||
      height === iphoneXMaxHeight ||
      width === iphoneXMaxHeight)
  );
};

export const getElevation = (elevation: number): ViewStyle => ({
  elevation,
  shadowColor: palette.shadow,
  shadowOffset: {
    width: 0,
    height: Math.round(1 + elevation / 4),
  },
  shadowOpacity: 0.17 + elevation / 100,
  shadowRadius: 1 + elevation / 2,
});
