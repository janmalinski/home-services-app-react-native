import React from 'react';
import { Icon as ElementsIcon, IconProps as ElementsIconProps } from 'react-native-elements';

import { palette } from 'app/config/styles';

export type IconProps = ElementsIconProps;

export const Icon = ({ color = palette.primaryDefault, ...props }: IconProps) => (
  //@ts-ignore
  <ElementsIcon type="material-community" color={color} {...props} />
);
