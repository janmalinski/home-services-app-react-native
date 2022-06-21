import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { BottomTabBarIcon } from 'app/components';
import { i18n } from 'app/config/translations';
import { getMainTabScreenOptions } from 'app/lib/navigation';
import { AdListScreen, AdCreateScreen, SettingsScreen } from 'app/screens';
import * as Types from 'app/types';

interface Props {
  raised?: boolean;
}

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = ({ raised }: Props) => {
  const variant = raised ? 'raised' : 'default';
  const screenOptions = getMainTabScreenOptions(variant);
  return (
    <Tab.Navigator initialRouteName={Types.Route.AdList} screenOptions={screenOptions}>
      <Tab.Screen
        name={Types.Route.AdList}
        component={AdListScreen}
        options={{
          tabBarIcon: (props) => <BottomTabBarIcon {...props} name="view-list" />,
          title: i18n.t('adList:list'),
          headerTitle: i18n.t('adList:contentList'),
        }}
      />
      <Tab.Screen
        name={Types.Route.AdCreate}
        component={AdCreateScreen}
        options={{
          tabBarIcon: (props) => <BottomTabBarIcon {...props} name="plus" />,
          title: i18n.t('adCreate:createAd'),
          headerTitle: i18n.t('adCreate:createAd'),
        }}
      />
      <Tab.Screen
        name={Types.Route.Settings}
        component={SettingsScreen}
        options={{
          tabBarIcon: (props) => <BottomTabBarIcon {...props} name="cog" />,
          title: i18n.t('settings:settings'),
        }}
      />
    </Tab.Navigator>
  );
};
