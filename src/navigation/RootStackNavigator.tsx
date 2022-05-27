import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import * as Types from 'app/types';
import { WelcomeScreen, LocationScreen } from 'app/screens';

const Stack = createStackNavigator<Types.RootStackParams>();

export const RootStackNavigator = () => {

    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name={Types.Route.Welcome} component={WelcomeScreen}  options={{headerShown: false}}/>
                <Stack.Screen name={Types.Route.Location} component={LocationScreen} options={{headerShown: false}} />
            </Stack.Group>
        </Stack.Navigator>
    );
};