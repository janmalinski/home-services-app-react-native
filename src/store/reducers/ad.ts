import * as Types from 'app/types';

export interface AdState {
  data: Types.Ad;
  isLoading: boolean;
  error: string;
  message: string;
}

const INITIAL_STATE: AdState = {
  data: {
    id: '',
    description: '',
    services: [],
  },
  isLoading: false,
  error: '',
  message: '',
};

export default function user(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.AD.CREATE_AD_PENDING: {
      return {
        ...state,
        isLoading: true,
        message: '',
        error: '',
      };
    }

    case Types.AD.CREATE_AD_SUCCESS: {
      return {
        ...state,
        data: action.payload.ad,
        message: action.payload.message,
        isLoading: false,
        error: '',
      };
    }

    case Types.AD.CREATE_AD_FAILD: {
      return {
        ...state,
        isLoading: false,
        message: '',
        error: action.payload.message,
      };
    }

    default: {
      return state;
    }
  }
}
