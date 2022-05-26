import React from 'react';
import { NavigationAction, NavigationState, NavigationContainerRef } from '@react-navigation/native';

import * as Types from 'app/types';

type ParamList = Types.NavParams;
export default class NavigationService {
 navigationRef = React.createRef<NavigationContainerRef<ParamList>>();
 currentRoute = '';
 
 goBack() {
     this.navigationRef.current?.goBack();
 }
 
 navigate<RouteName extends keyof ParamList>(
     ...args: undefined extends ParamList[RouteName] ? [screen: RouteName] | [screen: RouteName, params: ParamList[RouteName]] :
     [screen: RouteName, params: ParamList[RouteName]]
 ) {
     this.navigationRef.current?.navigate(...args);
 }

 dispatch(action: NavigationAction | ((state: NavigationState) => NavigationAction)){
     this.navigationRef.current?.dispatch(action as any)
 }

 getCurrentRoute() {
     return this.navigationRef.current?.getCurrentRoute();
 }

}



