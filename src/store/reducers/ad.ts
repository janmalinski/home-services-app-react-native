import * as Types from 'app/types';

export interface AdState {
  data: Types.Ad;
  isPending: boolean;
  success: boolean;
  error: string;
  message: string;
}

const INITIAL_STATE: AdState = {
  data: {
    id: '',
    description: '',
    services: [],
  },
  isPending: false,
  success: false,
  error: '',
  message: '',
};

export default function user(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.AD.CREATE_AD_PENDING: {
      return {
        ...state,
        isPending: true,
        success: false,
        message: '',
        error: '',
      };
    }

    case Types.AD.CREATE_AD_SUCCESS: {
      return {
        ...state,
        data: action.payload.ad,
        message: action.payload.message,
        isPending: false,
        success: true,
        error: '',
      };
    }

    case Types.AD.CREATE_AD_FAILD: {
      return {
        ...state,
        isPending: false,
        success: false,
        message: '',
        error: action.payload.message,
      };
    }

    default: {
      return state;
    }
  }
}
