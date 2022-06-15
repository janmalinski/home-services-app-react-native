import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import {
    cardWithoutHeaderScreenOptions,
    defaultScreenOptions,
    dialogScreenOptions,
    fullScreenModalScreenOptions,
  } from 'app/lib/navigation';
import * as Types from 'app/types';
import { WelcomeScreen, LocationScreen, MapScreen,SignUpScreen, RegistrationCodeSignUpScreen, SignInScreen, ResetPasswordScreen, ContentCreateScreen, AccountScreen, SignOutDialogScreen } from 'app/screens';
import { BottomTabNavigator } from './BottomTabNavigator';
import * as Selectors from 'app/store/selectors';
import { i18n } from 'app/config/translations';

const Stack = createStackNavigator<Types.RootStackParams>();

export const StackNavigator = () => {
    const isLoggedIn = useSelector(Selectors.isLoggedIn);



    const welcomeScreens = (
        <>
            <Stack.Screen
                options={{...cardWithoutHeaderScreenOptions}}
                name={Types.Route.Welcome}
                component={WelcomeScreen}
            />
            <Stack.Group screenOptions={defaultScreenOptions}>
                <Stack.Screen 
                    options={{ title: i18n.t('location:howCanWeHelpYou') }}
                    name={Types.Route.Location}
                    component={LocationScreen} 
                />
                <Stack.Screen
                    options={{ title: i18n.t('location:location'), presentation: 'modal', ...defaultScreenOptions}}
                    name={Types.Route.Map}
                    component={MapScreen}
                    />
                    <Stack.Screen
                    options={{ title: i18n.t('signIn:signIn') }}
                    name={Types.Route.SignIn}
                    component={SignInScreen}
                />
                <Stack.Screen
                    options={{ title: i18n.t('signUp:signUp') }}
                    name={Types.Route.SignUp}
                    component={SignUpScreen}
                />
                <Stack.Screen
                    options={{ 
                        title: i18n.t('registrationCodeSignUp:registrationCodeVerification'),
                        headerLeft: () => null
                    }}
                    name={Types.Route.RegistrationCodeSignUp}
                    component={RegistrationCodeSignUpScreen}
                />
                <Stack.Screen
                    options={{ title: i18n.t('resetPassword:resetPassword') }}
                    name={Types.Route.ResetPassword}
                    component={ResetPasswordScreen}
                />
            </Stack.Group>
        </>
      
    );

    const privateScreens = (
        <>
            <Stack.Screen
                options={{ ...cardWithoutHeaderScreenOptions}}
                name={Types.Route.MainTab}
                component={BottomTabNavigator}
            />
            <Stack.Screen
                options={{ title: i18n.t('adListaddContent'), ...fullScreenModalScreenOptions }}
                name={Types.Route.ContentCreate}
                component={ContentCreateScreen}
            />  
            <Stack.Screen
                options={{ title: i18n.t('location:location'), presentation: 'modal', ...defaultScreenOptions}}
                name={Types.Route.AdCreateMap}
                component={MapScreen}
            />
            <Stack.Screen
                options={dialogScreenOptions}
                name={Types.Route.SingOutDialog}
                component={SignOutDialogScreen}
            />
            <Stack.Screen
                options={{ title: i18n.t('account:account') }}
                name={Types.Route.Account}
                component={AccountScreen}
            />
        </>
    );

    return (
        <Stack.Navigator
        initialRouteName={isLoggedIn ? Types.Route.MainTab : Types.Route.Welcome}
        >
        {isLoggedIn ? privateScreens : welcomeScreens}
        </Stack.Navigator>
    );
};