import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import {
  ListItem as ElementsListItem,
  ListItemProps as ElementsListItemProps,
  Avatar,
} from 'react-native-elements';

import { palette, typography } from 'app/config/styles';

import { Icon, IconProps } from '../Icon';
import { Switch, SwitchProps } from '../Switch';

export interface ListItemProps extends ElementsListItemProps {
  title?: string;
  subtitle?: string;
  raised?: boolean;
  border?: boolean;
  leftComponent?: 'avatar' | 'icon';
  rightComponent?: 'chevron' | 'switch' | 'close';
  avatarUri?: string;
  icon?: IconProps;
  switchProps?: SwitchProps;
  style?: StyleProp<ViewStyle>;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  raised,
  border,
  leftComponent,
  rightComponent,
  avatarUri,
  icon,
  switchProps,
  style,
  containerStyle,
  ...props
}) => {
  const variant = raised ? 'raised' : 'default';
  return (
    <ElementsListItem
      {...props}
      hasTVPreferredFocus={undefined}
      tvParallaxProperties={undefined}
      style={[styles.root, style]}
      containerStyle={[styles.containerStyle, border ? styles.border : styles.line, containerStyle]}
      pad={12}
    >
      {leftComponent === 'avatar' && avatarUri && (
        <Avatar rounded source={{ uri: avatarUri }} avatarStyle={styles.avatar} />
      )}
      {leftComponent === 'icon' && icon && (
        <Icon name={icon.name} color={palette.ListItem.default.icon} size={28} />
      )}
      <ElementsListItem.Content>
        <ElementsListItem.Title style={[styles.title, { color: palette.ListItem[variant].title }]}>
          {title}
        </ElementsListItem.Title>
        {subtitle && (
          <ElementsListItem.Subtitle style={styles.subtitle}>{subtitle}</ElementsListItem.Subtitle>
        )}
      </ElementsListItem.Content>
      {rightComponent === 'chevron' && (
        <Icon name="chevron-right" color={palette.ListItem[variant].chevron} size={28} />
      )}
      {rightComponent === 'close' && (
        <Icon name="close" color={palette.ListItem[variant].chevron} size={28} />
      )}
      {rightComponent === 'switch' && switchProps && <Switch {...switchProps} />}
    </ElementsListItem>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 4,
  },
  containerStyle: {
    backgroundColor: palette.ListItem.default.background,
    paddingHorizontal: 12,
    paddingVertical: 11,
    minHeight: 52,
  },
  border: {
    borderWidth: 1,
    borderRadius: 4,
    color: palette.ListItem.default.border,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: palette.ListItem.default.line,
  },
  avatar: {
    width: 36,
    height: 36,
  },
  title: {
    ...typography.subtitle2,
  },
  subtitle: {
    ...typography.caption,
    color: palette.ListItem.default.subtitle,
  },
});
