import * as Types from 'app/types';

export const getTypeemploymentRequest = () => {
  return {
    type: Types.TYPEEMPLOYMENT.GET_TYPEEMPLOYMENT_REQUEST,
  };
};

export const setLoadingGetTypeemployment = () => ({
  type: Types.TYPEEMPLOYMENT.GET_TYPEEMPLOYMENT_PENDING,
});

export const getTypeemploymentSuccess = ({
  typeemployments,
}: {
  typeemployments: Types.TYPEEMPLOYMENT[];
}) => {
  return {
    type: Types.TYPEEMPLOYMENT.GET_TYPEEMPLOYMENT_SUCCESS,
    payload: {
      typeemployments,
    },
  };
};

export const getTypeemploymentFailed = ({ message }: { message: string }) => {
  return {
    type: Types.TYPEEMPLOYMENT.GET_TYPEEMPLOYMENT_FAILD,
    payload: {
      message,
    },
  };
};
