import * as Types from 'app/types';

export const getServicesRequest = (token: string) => {
  return {
    type: Types.SERVICE.GET_SERVICES_REQUEST,
    payload: {
      token,
    },
  };
};

export const setLoadingGetServices = () => ({
  type: Types.SERVICE.GET_SERVICES_PENDING,
});

export const getServicesSuccess = ({ services }: { services: Types.SERVICE[] }) => {
  return {
    type: Types.SERVICE.GET_SERVICES_SUCCESS,
    payload: {
      services,
    },
  };
};

export const getServicesFailed = ({ message }: { message: string }) => {
  return {
    type: Types.SERVICE.GET_SERVICES_FAILD,
    payload: {
      message,
    },
  };
};
