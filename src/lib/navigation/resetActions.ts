/**
 * DOCS:
 * https://reactnavigation.org/docs/navigation-prop/#dispatch
 * https://reactnavigation.org/docs/navigation-actions/#reset
 */
import { NavigationState, CommonActions } from '@react-navigation/native';

import * as Types from 'app/types';

// NOTE: This is only an example
// NavigationService.dispatch(removeSignInFromHistory());
export const removeSignInFromHistory = () => (state: NavigationState) => {
  const routes = state.routes.filter((route) => route.name !== Types.Route.SignIn);
  return CommonActions.reset({
    ...state,
    routes,
    index: routes.length - 1,
  });
};
