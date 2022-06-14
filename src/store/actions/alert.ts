import * as Types from 'app/types';

export const setAlert = ( message: string, status: string) => {
  return {
    type: Types.ALERT.SET_ALERT,
    payload: {
      message,
      status
    },
  };
};

export const removeAlert = () => {
  return {
    type: Types.ALERT.REMOVE_ALERT,
  }
}

export type SetAlertAction = ReturnType<typeof setAlert>;
