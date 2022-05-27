import * as Types from 'app/types';

export const createAdRequest = (
  token: string,
  description: string,
  serviceIds: string[],
  employmentTypeIds: string[],
  dateAvailableFrom: Date,
  fixedTerm: boolean,
  dateAvailableTo: Date,
  workingTimeNegotiable: boolean,
  workingTime: Types.WorkingTime[],
) => ({
  type: Types.AD.CREATE_AD_REQUEST,
  token,
  description,
  serviceIds,
  employmentTypeIds,
  dateAvailableFrom,
  fixedTerm,
  dateAvailableTo,
  workingTimeNegotiable,
  workingTime
});

export const setLoadingCreateAd = () => ({
  type: Types.AD.CREATE_AD_PENDING,
});

export const createAdSuccess = (
  message: string,
  ad: { id: string; description: string; services: { id: string; name: string }[] },
) => {
  return {
    type: Types.AD.CREATE_AD_SUCCESS,
    payload: {
      message,
      ad,
    },
  };
};

export const createAdFailed = ({ message }: { message: string }) => {
  return {
    type: Types.AD.CREATE_AD_FAILD,
    payload: {
      message,
    },
  };
};
