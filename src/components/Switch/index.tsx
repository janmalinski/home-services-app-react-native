import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';

import { palette } from 'app/config/styles';

export interface SwitchProps {
  value: boolean;
  onValueChange: () => void;
  size: 'small' | 'medium' | 'large';
  raised: boolean;
  disabled: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  size = 'medium',
  raised,
  disabled,
}) => {
  const handlePress = useCallback(() => {
    if (!disabled) {
      onValueChange();
    }
  }, [disabled, onValueChange]);

  return (
    <SwitchToggle
      switchOn={value}
      onPress={handlePress}
      containerStyle={StyleSheet.flatten([
        styles.rectangle,
        size === 'small' ? styles.smallSize : size === 'medium' ? styles.mediumSize : styles.largeSize,
      ])}
      circleStyle={StyleSheet.flatten([
        size === 'small'
          ? styles.smallSizeEllipse
          : size === 'medium'
          ? styles.mediumSizeEllipse
          : styles.largeSizeEllipse,
        !disabled ? styles.ellipseShadow : null,
      ])}
      backgroundColorOn={
        disabled
          ? palette.Switch.selected.disabled.background
          : raised
          ? palette.Switch.selected.raised.background
          : palette.Switch.selected.default.background
      }
      backgroundColorOff={
        disabled
          ? palette.Switch.unselected.disabled.background
          : palette.Switch.unselected.default.background
      }
      circleColorOn={
        disabled
          ? palette.Switch.selected.disabled.circleBackground
          : palette.Switch.selected.default.circleBackground
      }
      circleColorOff={
        disabled
          ? palette.Switch.unselected.disabled.circleBackground
          : palette.Switch.unselected.default.circleBackground
      }
      type={0}
    />
  );
};

const styles = StyleSheet.create({
  rectangle: {
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 8,
    padding: 2,
  },
  smallSize: {
    width: 44,
    height: 24,
  },
  mediumSize: {
    width: 48,
    height: 28,
  },
  largeSize: {
    width: 52,
    height: 32,
  },
  smallSizeEllipse: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowRadius: 10,
  },
  mediumSizeEllipse: {
    width: 24,
    height: 24,
    borderRadius: 12,
    shadowRadius: 12,
  },
  largeSizeEllipse: {
    width: 28,
    height: 28,
    borderRadius: 14,
    shadowRadius: 14,
  },
  ellipseShadow: {
    shadowColor: palette.Switch.selected.default.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    elevation: 2,
  },
});
