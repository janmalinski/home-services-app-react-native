import * as Types from 'app/types';

export const getRoleRequest = () => {
  return {
    type: Types.ROLE.GET_ROLE_REQUEST,
  };
};

export const setLoadingGetRole = () => ({
  type: Types.ROLE.GET_ROLE_PENDING,
});

export const getRoleSuccess = ({ roles }: { roles: Types.Role[] }) => {
  return {
    type: Types.ROLE.GET_ROLE_SUCCESS,
    payload: {
      roles,
    },
  };
};

export const getRoleFailed = ({ message }: { message: string }) => {
  return {
    type: Types.ROLE.GET_ROLE_FAILD,
    payload: {
      message,
    },
  };
};
