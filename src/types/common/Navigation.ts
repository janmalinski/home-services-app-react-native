import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Coordinates } from './Coordinates';

export enum Route {
  Location = 'Location',
  Map = 'Map',
  ContentCreate = 'ContentCreate',
  AdCreateMap = 'AdCreateMap',
  AdCreate = 'AdCreate',
  AdList = 'AdList',
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

interface AdCreateParams {
  latitude?: number;
  longitude?: number;
  address?: string;
}

export type MainTabParams = {
  [Route.AdList]: NoParams;
  [Route.AdCreate]: AdCreateParams;
  [Route.Settings]: NoParams;
};

interface SignUpScreenParams extends Pick<MapScreenParams, 'userType'>, Pick<Coordinates, 'latitude' | 'longitude'> {};

interface MapScreenParams {
  redirectAfterSubmit: string;
  userType: {
    id: string;
    name: string;
  };
}

export type RootStackParams = {
  [Route.ContentCreate]: NoParams;
  [Route.MainTab]: NavigatorScreenParams<MainTabParams>;
  [Route.ResetPassword]: NoParams;
  [Route.Location]: NoParams;
  [Route.Map]: MapScreenParams,
  [Route.AdCreate]: AdCreateParams;
  [Route.AdCreateMap]: MapScreenParams,
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

export type RootStackNavigationProps<R extends keyof RootStackParams> = StackNavigationProp<
  RootStackParams,
  R
>;

export type RootStackRouteProp<R extends keyof RootStackParams> = RouteProp<RootStackParams, R>;

export interface RootStackScreenProps<R extends keyof RootStackParams> {
  navigation: RootStackNavigationProps<R>;
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
