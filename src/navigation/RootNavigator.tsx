import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';

import { navigationService } from 'app/lib/services';

import { StackNavigator } from './StackNavigator';

export const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationService.navigationRef}>
      <StackNavigator />
    </NavigationContainer>
  );
};
