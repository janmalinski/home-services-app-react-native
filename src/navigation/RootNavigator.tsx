import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigator } from './StackNavigator';
import { navigationService } from 'app/lib/services';

export const RootNavigator = () => {

    return (
        <NavigationContainer ref={navigationService.navigationRef}>
            <StackNavigator />
        </NavigationContainer>
    )
   



}