import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Coordinates } from './Coordinates';

export enum Route {
  Location = 'Location',
  Map = 'Map',
  ContentCreate = 'ContentCreate',
  ContentImage = 'ContentImage',
  ContentList = 'ContentList',
  MainTab = 'MainTab',
  ResetPassword = 'ResetPassword',
  Settings = 'Settings',
  SignIn = 'SignIn',
  SignUp = 'SignUp',
  RegistrationCodeSignUp = 'RegistrationCodeSignUp',
  SingOutDialog = 'SingOutDialog',
  Storybook = 'Storybook',
  Welcome = 'Welcome',
  Account = 'Account',
}

type NoParams = undefined;

/* Params of navigators */

export type MainTabParams = {
  [Route.ContentList]: NoParams;
  [Route.ContentImage]: NoParams;
  [Route.Settings]: NoParams;
};

interface SignUpScreenParams extends MapScreenParams, Pick<Coordinates, 'latitude' | 'longitude'> {};

interface MapScreenParams {
  userType: string;
}

export type RootStackParams = {
  [Route.ContentCreate]: NoParams;
  [Route.MainTab]: NavigatorScreenParams<MainTabParams>;
  [Route.ResetPassword]: NoParams;
  [Route.Location]: NoParams;
  [Route.Map]: MapScreenParams,
  [Route.SignIn]: NoParams;
  [Route.SignUp]: SignUpScreenParams;
  [Route.RegistrationCodeSignUp]: NoParams;
  [Route.SingOutDialog]: NoParams;
  [Route.Storybook]: NoParams;
  [Route.Welcome]: NoParams;
  [Route.Account]: NoParams;
};

export interface NavParams extends MainTabParams, RootStackParams {}

/* Utility types for screens */

export type RootStackNavigationProp<R extends keyof RootStackParams> = StackNavigationProp<
  RootStackParams,
  R
>;

export type RootStackRouteProp<R extends keyof RootStackParams> = RouteProp<RootStackParams, R>;

export interface RootStackNavigatorProps<R extends keyof RootStackParams> {
  navigation: RootStackNavigationProp<R>;
  route: RootStackRouteProp<R>;
}

export type MainTabNavigationProp<R extends keyof MainTabParams> = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParams, R>,
  StackNavigationProp<RootStackParams>
>;

export type MainTabRouteProp<R extends keyof MainTabParams> = RouteProp<MainTabParams, R>;

export interface MainTabScreenProps<R extends keyof MainTabParams> {
  navigation: MainTabNavigationProp<R>;
  route: MainTabRouteProp<R>;
}
