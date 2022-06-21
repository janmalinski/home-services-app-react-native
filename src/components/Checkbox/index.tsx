import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, StyleProp, ViewStyle } from 'react-native';

import { palette, spacing, typography } from 'app/config/styles';

import { Icon } from '../Icon';

export interface CheckboxProps {
  checked?: boolean;
  label?: string | React.ReactNode;
  onPress?: (value: boolean, index?: number) => void;
  size?: 'small' | 'medium';
  disabled?: boolean;
  raised?: boolean;
  errorMessage?: string | boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onPress,
  label,
  size = 'medium',
  disabled,
  raised,
  errorMessage,
  containerStyle,
}) => {
  const state = disabled ? 'disabled' : raised ? 'raised' : 'default';
  const select = checked ? 'selected' : 'unselected';
  const handlePress = useCallback(() => {
    onPress && onPress(!checked);
  }, [checked, onPress]);

  return (
    <>
      <TouchableOpacity activeOpacity={!disabled ? 0.2 : 1} onPress={!disabled ? handlePress : undefined}>
        <>
          <View style={[styles.container, containerStyle]}>
            <Icon
              onPress={!disabled ? handlePress : undefined}
              name="check"
              type="font-awesome"
              color={palette.Checkbox[select][state].icon}
              size={spacing.regular}
              containerStyle={[
                styles.iconContainer,
                size === 'small' ? styles.iconSmall : styles.iconMedium,
                {
                  borderColor: errorMessage ? palette.error : palette.Checkbox[select][state].border,
                  backgroundColor: palette.Checkbox[select][state].background,
                },
              ]}
            />
            <View style={styles.labelContainer}>
              <Text
                style={[
                  size === 'small' ? styles.labelSmall : styles.labelMedium,
                  { color: palette.Checkbox[select][state].label },
                  errorMessage ? { color: palette.error } : {},
                ]}
              >
                {label}
              </Text>
            </View>
          </View>
        </>
      </TouchableOpacity>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 13,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.6,
    borderRadius: 3,
    marginRight: 11,
  },
  iconSmall: {
    width: 15,
    height: 15,
  },
  iconMedium: {
    width: 18,
    height: 18,
  },
  labelContainer: {
    flex: 1,
    marginTop: -1,
  },
  labelSmall: {
    ...typography.caption,
  },
  labelMedium: {
    ...typography.body2,
  },
  error: {
    ...typography.hints,
    color: palette.error,
    marginTop: -10,
  },
});
