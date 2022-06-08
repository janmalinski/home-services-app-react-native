import { API } from 'app/config/api';
import * as Types from 'app/types';

export const createAd = (
  token: string,
  description: string,
  serviceIds: string[],
  employmentTypeIds: string[],
  dateAvailableFrom: Date,
  fixedTerm: boolean,
  dateAvailableTo: Date,
  workingTimeNegotiable: boolean,
  workingTime: Types.WorkingTime[],
  address: string,
  latitude: number,
  longitude: number
) => {
  const body = {
    description,
    serviceIds,
    employmentTypeIds,
    dateAvailableFrom,
    fixedTerm,
    dateAvailableTo,
    workingTimeNegotiable,
    workingTime,
    address,
    latitude,
    longitude
  };

  return API.post('/ad/create', body, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
