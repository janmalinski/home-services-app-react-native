import * as Types from 'app/types';

import { SetAlertAction } from '../actions';

export interface AlertState {
  message: string;
  status: string;
}

const INITIAL_STATE: AlertState = {
  message: '',
  status: '',
};

export default function alert(state = INITIAL_STATE, action: SetAlertAction) {
  switch (action.type) {
    case Types.ALERT.SET_ALERT: {
      return {
        message: action.payload.message,
        status: action.payload.status,
      };
    }

    case Types.ALERT.REMOVE_ALERT: {
      return INITIAL_STATE;
    }

    default: {
      return state;
    }
  }
}
