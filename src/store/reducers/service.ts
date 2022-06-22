import * as Types from 'app/types';

export interface ServiceState {
  data: Types.Service[];
  isLoading: boolean;
  error: string;
}

const INITIAL_STATE: ServiceState = {
  data: [],
  isLoading: false,
  error: '',
};
//THIS PART WILL BE FINISHED - ADD TYPES OF ACTION
export default function service(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.SERVICE.GET_SERVICES_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }

    case Types.SERVICE.GET_SERVICES_SUCCESS: {
      return {
        ...state,
        data: action.payload.services,
        isLoading: false,
        error: '',
      };
    }

    case Types.SERVICE.GET_SERVICES_FAILD: {
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
