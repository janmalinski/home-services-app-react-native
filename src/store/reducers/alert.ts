import * as Types from 'app/types';

import { SetAlertAction } from '../actions';

export interface AlertState {
  message: string;
}

const INITIAL_STATE: AlertState = {
  message: '',
};

export default function alert(state = INITIAL_STATE, action: SetAlertAction) {
  switch (action.type) {
    case Types.ALERT.SET_ALERT: {
      return {
        message: action.payload.message,
      };
    }
    default: {
      return state;
    }
  }
}
