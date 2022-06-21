import { API } from 'app/config/api';

export const getUser = (token: string) => {
  return API.get('/user', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const uploadUserAvatar = (token: string, avatar: string) => {
  const formData = new FormData();
  formData.append('avatar', {
    uri: avatar,
    name: 'avatar.jpg',
    type: 'image/jpg',
  });
  return API.post('/user/upload-avatar', formData, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const updateUser = (
  token: string,
  firstName: string,
  phoneNumber: string,
  consentPhoneNumberVisibility: boolean,
  email: string,
  latitude: number,
  longitude: number,
) => {
  const body = {
    name: firstName,
    phoneNumber,
    phoneNumberConsent: consentPhoneNumberVisibility,
    email,
    latitude,
    longitude,
  };
  return API.patch('user/update', body, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const getNearbyUsers = (latitude: number, longitude: number) => {
  const body = {
    latitude,
    longitude,
  };

  return API.post('user/get-nearby-users', body);
};
