import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackNavigator } from './RootStackNavigator';

export const RootNavigator = () => {

    return (
        <NavigationContainer>
            <RootStackNavigator />
        </NavigationContainer>
    )
   



}