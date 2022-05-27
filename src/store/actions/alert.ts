import * as Types from 'app/types';

export const setAlert = ({ message }: { message: string }) => {
  return {
    type: Types.ALERT.SET_ALERT,
    payload: {
      message,
    },
  };
};

export type SetAlertAction = ReturnType<typeof setAlert>;
