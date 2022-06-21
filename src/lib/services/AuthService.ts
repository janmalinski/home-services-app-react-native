import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AuthService {
  static async resetAsyncStorage() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('ERROR_AUTHSERVICE_RESET_ASYNC_STORAGE', error);
    }
  }
}
