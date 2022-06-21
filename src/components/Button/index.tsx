import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as ElementsButton, ButtonProps as ElementsButtonProps } from 'react-native-elements';

import { Icon } from 'app/components';
import { typography, palette } from 'app/config/styles';

export interface ButtonProps extends ElementsButtonProps {
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  iconName?: string;
}

export const smallHeight = 48;
export const mediumHeight = 60;

export const Button = ({
  color = 'primary',
  size = 'small',
  type = 'solid',
  iconName,
  icon,
  iconPosition = 'left',
  iconRight,
  title,
  raised,
  disabled,
  buttonStyle,
  titleStyle,
  disabledStyle,
  disabledTitleStyle,
  ...props
}: ButtonProps) => {
  const variant = raised ? 'raised' : 'default';

  return (
    <ElementsButton
      {...props}
      iconRight={iconRight}
      iconPosition={iconPosition}
      icon={
        icon ? (
          icon
        ) : iconName ? (
          <Icon
            name={iconName}
            color={
              !disabled
                ? palette.Button[color][type][variant].title
                : palette.Button[color][type].disabled.title
            }
            iconStyle={
              title
                ? iconPosition === 'right' || iconRight
                  ? styles.iconRight
                  : styles.iconLeft
                : undefined
            }
            size={24}
          />
        ) : undefined
      }
      buttonStyle={[
        styles.button,
        size === 'small' ? styles.sizeSmall : styles.sizeMedium,
        {
          backgroundColor: palette.Button[color][type][variant].background,
          borderColor: palette.Button[color][type][variant].border,
        },
        type === 'outline' ? styles.border : null,
        buttonStyle,
      ]}
      disabledStyle={[
        {
          backgroundColor: palette.Button[color][type].disabled.background,
          borderColor: palette.Button[color][type].disabled.border,
        },
        disabledStyle,
      ]}
      type={type}
      disabled={disabled}
      title={title}
      titleStyle={[
        styles.title,
        {
          color: palette.Button[color][type][variant].title,
        },
        titleStyle,
      ]}
      disabledTitleStyle={[
        {
          color: palette.Button[color][type].disabled.title,
        },
        disabledTitleStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    elevation: 0,
  },
  title: {
    ...typography.button,
  },
  sizeSmall: {
    height: smallHeight,
  },
  sizeMedium: {
    height: mediumHeight,
  },
  border: {
    borderWidth: 1,
  },
  iconRight: {
    marginStart: 12,
  },
  iconLeft: {
    marginEnd: 12,
  },
});
