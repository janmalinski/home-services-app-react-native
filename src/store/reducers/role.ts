import * as Types from 'app/types';

export interface RoleState {
  data: Types.Role[];
  isLoading: boolean;
  error: string;
}

const INITIAL_STATE: RoleState = {
  data: [],
  isLoading: false,
  error: '',
};

export default function role(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.ROLE.GET_ROLE_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }

    case Types.ROLE.GET_ROLE_SUCCESS: {
      return {
        ...state,
        data: action.payload.roles,
        isLoading: false,
        error: '',
      };
    }

    case Types.ROLE.GET_ROLE_FAILD: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    }

    default: {
      return state;
    }
  }
}
