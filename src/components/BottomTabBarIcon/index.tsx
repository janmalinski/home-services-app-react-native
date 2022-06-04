import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { Icon } from '../Icon';

export interface BottomTabBarIconProps {
  name: string;
  color: string;
  focused: boolean;
  size: number;
}

export const BottomTabBarIcon: React.FC<BottomTabBarIconProps> = ({ focused, color, name, size }) => {
  return (
    <View style={styles.container}>
      <Icon
        size={size}
        type="material-community"
        name={`${name}${focused ? '' : '-outline'}`}
        color={color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.select({ ios: 4, android: 0 }),
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
