// import analytics from '@react-native-firebase/analytics';
// import firebase from '@react-native-firebase/app';

// import * as Types from 'app/types';

// export default class AnalyticsService {
//   user: Types.User | null;
//   currentScreen = '';

//   constructor() {
//     const isRunningInTestLab = firebase.app().utils().isRunningInTestLab;
//     analytics().setAnalyticsCollectionEnabled(!__DEV__ && !isRunningInTestLab);
//     this.user = null;
//   }

//   setCurrentUser = (user: Types.User | null) => {
//     this.user = user;
//     const userId = this.user ? this.user.id : null;
//     analytics().setUserId(userId);
//   };

//   logEvent = (event: Types.AnalyticsEvent, params?: any) => {
//     analytics().logEvent(event, params);
//   };

//   setScreenName = (screenName: string) => {
//     // eslint-disable-next-line
//     analytics().logScreenView({ screen_name: screenName, screen_class: screenName });
//     this.currentScreen = screenName;
//   };
// }
