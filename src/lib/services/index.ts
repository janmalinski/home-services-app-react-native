// import AnalyticsService from './AnalyticsService';
import AuthService from './AuthService';
import NavigationService from './NavigationService';

export * from './AuthService';
// export * from './CrashlyticsService';

export const authService = new AuthService();
export const navigationService = new NavigationService();
// export const analyticsService = new AnalyticsService();
