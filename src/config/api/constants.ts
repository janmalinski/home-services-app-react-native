import Axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';

export const APP_NAME = 'App';
export const API_URL = Config.API_URL;
export const MIN_PASSWORD_LENGTH = 6;
export const MIN_PHONE_NUMBER_LENGTH = 9;
export const MAX_PHONE_NUMBER_LENGTH = 9;
export const MIN_NAME_LENGTH = 2;

export const API: AxiosInstance = Axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
  baseURL: API_URL,
});
