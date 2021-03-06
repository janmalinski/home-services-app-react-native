import * as Types from 'app/types';

interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  phoneNumberConsent: boolean;
  avatarURL: string;
  ads: [
    {
      id: string;
      name: string;
    },
  ];
  roles: [
    {
      id: string;
      name: string;
    },
  ];
}

export interface UserState {
  user: User;
  nearbyUsers: User[];
  isLoading: boolean;
  error: string;
}

const INITIAL_STATE: UserState = {
  user: {
    id: '',
    email: '',
    name: '',
    phoneNumber: '',
    phoneNumberConsent: false,
    avatarURL: '',
    ads: [
      {
        id: '',
        name: '',
      },
    ],
    roles: [
      {
        id: '',
        name: '',
      },
    ],
  },
  nearbyUsers: [],
  isLoading: false,
  error: '',
};
// THIS PART WILL BE FINISHED - ADD TYPES OF ACTION
export default function user(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.USER.GET_USER_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }

    case Types.USER.GET_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload.user,
        isLoading: false,
        error: '',
      };
    }

    case Types.USER.GET_USER_FAILD: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    }

    case Types.USER.UPDATE_USER_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }

    case Types.USER.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        error: '',
      };
    }

    case Types.USER.UPDATE_USER_FAILD: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    }

    case Types.USER.GET_USER_AVATAR_SUCCESS: {
      return {
        ...state,
        avatarURL: action.payload.avatarURL,
        isLoading: false,
        error: '',
      };
    }

    case Types.USER.GET_USER_AVATAR_FAILD: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    }

    case Types.USER.GET_NEARBY_USERS_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }

    case Types.USER.GET_NEARBY_USERS_SUCCESS: {
      return {
        ...state,
        nearbyUsers: action.payload.users,
        isLoading: false,
        error: '',
      };
    }

    case Types.USER.GET_NEARBY_USERS_FAILD: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
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
