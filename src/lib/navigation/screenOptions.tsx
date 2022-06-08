import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { Icon } from 'app/components';
import { getElevation, palette, typography } from 'app/config/styles';

export interface ScreenOptions extends StackNavigationOptions {
  headerColor?: 'primary' | 'light';
}

export type HeaderScreenOptions = Pick<
  ScreenOptions,
  | 'headerColor'
  | 'headerTitle'
  | 'headerTitleAlign'
  | 'headerTitleStyle'
  | 'headerTitleContainerStyle'
  | 'headerTitleAllowFontScaling'
  | 'headerLeft'
  | 'headerLeftContainerStyle'
  | 'headerRight'
  | 'headerRightContainerStyle'
  | 'headerPressColor'
  | 'headerPressOpacity'
  | 'headerTintColor'
  | 'headerBackground'
  | 'headerBackgroundContainerStyle'
  | 'headerTransparent'
  | 'headerStyle'
  | 'headerStatusBarHeight'
  | 'headerBackAllowFontScaling'
  | 'headerBackAccessibilityLabel'
  | 'headerBackTestID'
  | 'headerBackTitle'
  | 'headerBackTitleVisible'
  | 'headerBackTitleStyle'
  | 'headerTruncatedBackTitle'
  | 'headerBackImage'
>;

const headerStyles = StyleSheet.create({
  card: {
    backgroundColor: palette.transparent,
  },
  header: {
    borderBottomWidth: 1,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  headerTitleContainer: {
    marginHorizontal: 16,
  },
  headerTitle: {
    ...typography.subtitle1,
  },
  headerBackTitle: {
    ...typography.subtitle1,
  },
  headerRight: {
    paddingEnd: 12,
  },
  headerLeft: {
    paddingStart: 16,
  },
});

const mainTabStyles = StyleSheet.create({
  label: {
    ...typography.caption,
    marginBottom: 3,
    marginTop: -3,
  },
  container: {
    ...getElevation(7),
    minHeight: 56,
  },
});

export function getHeaderOptions({
  headerColor = 'light',
  headerStyle,
  headerTitleStyle,
  headerBackTitleStyle,
  headerLeft,
  headerLeftContainerStyle,
  headerRight,
  headerRightContainerStyle,
  ...headerOptions
}: HeaderScreenOptions): StackNavigationOptions {
  return {
    headerStyle: [
      headerStyles.header,
      {
        backgroundColor: palette.Header[headerColor].background,
        borderBottomColor: palette.Header[headerColor].border,
      },
      headerStyle,
    ],
    headerBackImage: ({ tintColor }) => <Icon name="chevron-left" color={tintColor} size={32} />,
    headerTintColor: palette.Header[headerColor].title,
    headerTitleContainerStyle: [headerStyles.headerTitleContainer],
    headerTitleStyle: [headerStyles.headerTitle, headerTitleStyle],
    headerBackTitleStyle: [headerStyles.headerBackTitle, headerBackTitleStyle],
    headerLeft,
    headerLeftContainerStyle: [headerLeft && headerStyles.headerLeft, headerLeftContainerStyle],
    headerRight,
    headerRightContainerStyle: [headerRight && headerStyles.headerRight, headerRightContainerStyle],
    ...headerOptions,
  };
}

export const defaultHeaderOptions = getHeaderOptions({});

export const defaultScreenOptions: StackNavigationOptions = {
  ...defaultHeaderOptions,
  cardStyle: headerStyles.card,
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
};

export const cardWithHeaderScreenOptions: StackNavigationOptions = {
  ...defaultHeaderOptions,
  headerShown: true,
  presentation: 'card',
};

export const cardWithoutHeaderScreenOptions: StackNavigationOptions = {
  ...defaultHeaderOptions,
  headerShown: false,
  presentation: 'card',
};

export const fullScreenModalScreenOptions: StackNavigationOptions = {
  ...defaultHeaderOptions,
  headerShown: true,
  presentation: 'modal',
  headerLeft: () => null, // no back button
};

export const dialogScreenOptions: StackNavigationOptions = {
  ...defaultHeaderOptions,
  headerShown: false,
  presentation: 'transparentModal',
  cardOverlayEnabled: true,
  cardStyleInterpolator: () => ({
    overlayStyle: {
      backgroundColor: palette.opacity,
    },
  }),
};

export function useScreenOptions<N extends StackNavigationProp<any, any>>(options: ScreenOptions) {
  const navigation = useNavigation<N>();

  useLayoutEffect(() => {
    navigation.setOptions({
      ...options,
      ...getHeaderOptions(options),
    });
  }, [navigation]);
}

export const getMainTabScreenOptions = (variant: 'raised' | 'default'): BottomTabNavigationOptions => ({
  tabBarButton: (props) => <TouchableOpacity {...props} />,
  tabBarActiveTintColor: palette.TabNavigator[variant].active,
  tabBarInactiveTintColor: palette.TabNavigator[variant].inactive,
  tabBarLabelStyle: mainTabStyles.label,
  tabBarStyle: mainTabStyles.container,
  tabBarHideOnKeyboard: true,
});
