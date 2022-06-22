import * as Types from 'app/types';

export interface TypeemploymentState {
  data: Types.Typeemployment[];
  isLoading: boolean;
  error: string;
}

const INITIAL_STATE: TypeemploymentState = {
  data: [],
  isLoading: false,
  error: '',
};

// THIS PART WILL BE FINISHED - ADD TYPES OF ACTION
export default function typeemployment(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.TYPEEMPLOYMENT.GET_TYPEEMPLOYMENT_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }

    case Types.TYPEEMPLOYMENT.GET_TYPEEMPLOYMENT_SUCCESS: {
      return {
        ...state,
        data: action.payload.typeemployments,
        isLoading: false,
        error: '',
      };
    }

    case Types.TYPEEMPLOYMENT.GET_TYPEEMPLOYMENT_FAILD: {
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
