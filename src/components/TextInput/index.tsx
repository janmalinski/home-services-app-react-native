import React, { useState, useCallback } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Input, InputProps, IconProps } from 'react-native-elements';

import { palette, typography } from 'app/config/styles';

import { Icon } from '../Icon';

export interface TextInputProps extends InputProps {
  withBorder: boolean;
  iconLeft?: IconProps;
  iconRight?: IconProps;
  size: 'small' | 'medium' | 'textArea';
  autoCompleteType: string;
}

export const inputItemHeightSmall = 48;
export const inputItemHeightMedium = 60;

export const TextInput: React.FC<TextInputProps> = ({
  withBorder,
  label,
  disabled,
  errorMessage,
  iconLeft,
  iconRight,
  size,
  placeholder,
  secureTextEntry,
  numberOfLines,
  value,
  containerStyle,
  inputContainerStyle,
  onFocus,
  onBlur,
  ...props
}) => {
  const [active, setActive] = useState(false);
  const [isSecureTextVisible, setIsSecureTextVisible] = useState(!secureTextEntry);

  const handleBlur = useCallback(
    (event) => {
      setActive((prevState) => !prevState);
      onBlur && onBlur(event);
    },
    [onBlur],
  );

  const handleFocus = useCallback(
    (event) => {
      setActive((prevState) => !prevState);
      onFocus && onFocus(event);
    },
    [onFocus],
  );

  const secureTextHandler = useCallback(() => {
    setIsSecureTextVisible((prevState) => !prevState);
  }, []);

  const SecureTextIcon = (
    <Icon
      name={isSecureTextVisible ? 'eye-off-outline' : 'eye-outline'}
      size={20}
      onPress={secureTextHandler}
      color={disabled ? palette.textDisabled : value ? palette.text : palette.subtitle}
      containerStyle={styles.iconContainer}
    />
  );

  const CustomIcon = (iconProps: IconProps) => {
    return (
      <Icon
        {...iconProps}
        size={20}
        color={disabled ? palette.textDisabled : value ? palette.text : palette.subtitle}
        containerStyle={styles.iconContainer}
      />
    );
  };

  return (
    <Input
      {...props}
      containerStyle={[styles.container, containerStyle]}
      inputContainerStyle={[
        styles.inputContainer,
        size === 'small' ? styles.smallInput : size === 'medium' ? styles.mediumInput : null,
        withBorder ? styles.withBorder : styles.lineInput,
        !!value && styles.filledBorder,
        disabled && styles.disabledContainer,
        !!errorMessage && styles.errorBorder,
        active && styles.activeBorder,
        inputContainerStyle,
      ]}
      inputStyle={
        disabled
          ? styles.disabledText
          : [size === 'textArea' && Platform.OS === 'android' && styles.textArea, styles.text]
      }
      value={value}
      label={label}
      labelStyle={[styles.label, !!errorMessage && styles.labelError]}
      disabled={disabled}
      errorMessage={errorMessage}
      errorStyle={styles.errorMessage}
      placeholder={placeholder}
      placeholderTextColor={palette.subtitle}
      secureTextEntry={secureTextEntry && !isSecureTextVisible}
      multiline={size === 'textArea'}
      numberOfLines={numberOfLines}
      onBlur={handleBlur}
      onFocus={handleFocus}
      leftIcon={!!iconLeft && CustomIcon(iconLeft)}
      rightIcon={secureTextEntry ? SecureTextIcon : !!iconRight && CustomIcon(iconRight)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  inputContainer: {
    backgroundColor: palette.backgroundLight,
  },
  smallInput: {
    height: inputItemHeightSmall,
  },
  mediumInput: {
    height: inputItemHeightMedium,
  },
  lineInput: {
    borderBottomWidth: 2,
  },
  withBorder: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: palette.border,
  },
  activeBorder: {
    borderColor: palette.primaryLight,
  },
  filledBorder: {
    borderColor: palette.textDisabled,
  },
  errorBorder: {
    borderColor: palette.error,
  },
  disabledContainer: {
    borderColor: palette.borderDisabled,
    backgroundColor: palette.background,
  },
  disabledText: {
    ...typography.body2,
    color: palette.textDisabled,
  },
  text: {
    ...typography.body2,
    color: palette.text,
    marginHorizontal: 8,
    marginVertical: 0,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  errorMessage: {
    ...typography.hints,
    color: palette.error,
  },
  label: {
    ...typography.overline,
    color: palette.label,
    marginBottom: 4,
  },
  labelError: {
    color: palette.error,
  },
  iconContainer: {
    paddingHorizontal: 15,
    alignSelf: 'center',
  },
});
