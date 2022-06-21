import * as Types from 'app/types';

export const signUpRequest = ({
  email,
  password,
  termsAccepted,
  latitude,
  longitude,
  userType,
  language,
}: Types.SignUpPayload) => {
  return {
    type: Types.AUTH.SIGN_UP_REQUEST,
    payload: {
      email,
      password,
      termsAccepted,
      latitude,
      longitude,
      userType,
      language,
    },
  };
};

export const setLoadingSignUp = () => ({
  type: Types.AUTH.SIGN_UP_PENDING,
});

export const setSignUpSuccess = () => ({
  type: Types.AUTH.SIGN_UP_SUCCESS,
});

export const setSignUpFailed = ({ message }: { message: string }) => {
  return {
    type: Types.AUTH.SIGN_UP_FAILED,
    payload: {
      message,
    },
  };
};

export const verifyRequest = ({ code }: { code: string }) => {
  return {
    type: Types.AUTH.VERIFY_REQUEST,
    payload: {
      code,
    },
  };
};

export const setLoadinVerify = () => ({
  type: Types.AUTH.VERIFY_PENDING,
});

export const setVerifySuccess = () => ({
  type: Types.AUTH.VERIFY_SUCCESS,
});

export const setVerifyFailed = ({ message }: { message: string }) => {
  return {
    type: Types.AUTH.VERIFY_FAILED,
    payload: {
      message,
    },
  };
};

export const setLoadingSignIn = () => ({
  type: Types.AUTH.SIGN_IN_PENDING,
});

export const setSignInSuccess = () => ({
  type: Types.AUTH.SIGN_IN_SUCCESS,
});

export const setSignInFailed = ({ message }: { message: string }) => {
  return {
    type: Types.AUTH.SIGN_IN_FAILED,
    payload: {
      message,
    },
  };
};

export const signInRequest = ({ email, password }: Types.SignInPayload) => {
  return {
    type: Types.AUTH.SIGN_IN,
    payload: {
      email,
      password,
    },
  };
};

export const setToken = ({ token }: { token: string }) => ({
  type: Types.AUTH.SET_TOKEN,
  payload: {
    token,
  },
});

export const signOut = () => ({
  type: Types.AUTH.SIGN_OUT,
});

export type SignUpAction = ReturnType<typeof signUpRequest>;

export type VerifyAction = ReturnType<typeof verifyRequest>;

export type SetTokenAction = ReturnType<typeof setToken>;

export type SignInAction = ReturnType<typeof signInRequest>;
