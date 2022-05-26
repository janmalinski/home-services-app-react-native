import { API } from 'app/config/api';
import * as Types from 'app/types';

export const signUp = ({ email, password, termsAccepted, latitude, longitude, userType }: Types.SignUpPayload) => {
  return API.post('/auth/signUp', {
    email,
    password,
    termsAccepted,
    latitude,
    longitude,
    userType
  });
};

export const verify = ({ code }: { code: string}) => {
  return API.post('/auth/verify', {
    code
  });
} 

export const signIn = ({ email, password }: Types.SignInPayload) => {
  return API.post('/auth/signIn', {
    email,
    password,
  });
};
