import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackNavigator } from './RootStackNavigator';
import { navigationService } from 'app/lib/services';

export const RootNavigator = () => {

    return (
        <NavigationContainer ref={navigationService.navigationRef}>
            <RootStackNavigator />
        </NavigationContainer>
    )
   



}