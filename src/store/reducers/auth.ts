import * as Types from 'app/types';

export interface AuthState {
  token: string;
  isLoading: boolean;
  error: string;
}

const INITIAL_STATE: AuthState = {
  token: '',
  isLoading: false,
  error: '',
};

export default function auth(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.AUTH.SIGN_UP_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }

    case Types.AUTH.SIGN_UP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: '',
      };
    }

    case Types.AUTH.SIGN_UP_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    }

    case Types.AUTH.VERIFY_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }

    case Types.AUTH.VERIFY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: '',
      };
    }

    case Types.AUTH.VERIFY_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    }

    case Types.AUTH.SIGN_IN_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }

    case Types.AUTH.SIGN_IN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: '',
      };
    }

    case Types.AUTH.SIGN_IN_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    }

    case Types.AUTH.SET_TOKEN: {
      return {
        ...state,
        token: action.payload.token,
        error: '',
      };
    }

    case Types.AUTH.SIGN_OUT: {
      return INITIAL_STATE;
    }

    default: {
      return state;
    }
  }
}
