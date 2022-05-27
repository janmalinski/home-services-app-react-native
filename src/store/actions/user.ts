import * as Types from 'app/types';

export const getUserRequest = (token: string) => {
  return {
    type: Types.USER.GET_USER_REQUEST,
    payload: {
      token,
    },
  };
};

export const setLoadingGetUser = () => ({
  type: Types.USER.GET_USER_PENDING,
});

export const getUserSuccess = ({ user }: { user: Types.USER }) => {
  return {
    type: Types.USER.GET_USER_SUCCESS,
    payload: {
      user,
    },
  };
};

export const getUserFailed = ({ message }: { message: string }) => {
  return {
    type: Types.USER.GET_USER_FAILD,
    payload: {
      message,
    },
  };
};

export const uploadUserAvatarRequest = (token: string, avatar: string) => {
  return {
    type: Types.USER.POST_USER_AVATAR_REQUEST,
    payload: {
      token,
      avatar,
    },
  };
};

export const getUserAvatarSuccess = (avatarURL: any) => {
  return {
    type: Types.USER.GET_USER_AVATAR_SUCCESS,
    payload: {
      avatarURL,
    },
  };
};

export const getUserAvatarFailed = ({ message }: { message: string }) => {
  return {
    type: Types.USER.GET_USER_AVATAR_FAILD,
    payload: {
      message,
    },
  };
};

export const setLoadingUpdateUser = () => ({
  type: Types.USER.UPDATE_USER_PENDING,
});

export const updateUserSuccess = ({ user }: { user: Types.USER }) => {
  return {
    type: Types.USER.UPDATE_USER_SUCCESS,
    payload: {
      user,
    },
  };
};

export const updateUserFailed = ({ message }: { message: string }) => {
  return {
    type: Types.USER.UPDATE_USER_FAILD,
    payload: {
      message,
    },
  };
};

export const updateUserRequest = (
  token: string,
  { firstName, phoneNumber, consentPhoneNumberVisibility, email, latitude, longitude }: Types.UpdateUserPayload,
) => {
  return {
    type: Types.USER.UPDATE_USER_REQUEST,
    payload: {
      token,
      firstName,
      phoneNumber,
      consentPhoneNumberVisibility,
      email,
      latitude,
      longitude
    }
  };
};

export type GetUserAction = ReturnType<typeof getUserRequest>;
