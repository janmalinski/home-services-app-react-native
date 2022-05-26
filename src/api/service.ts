import { API } from 'app/config/api';

export const getAllServices = (token: string) =>
  API.get('/service', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
