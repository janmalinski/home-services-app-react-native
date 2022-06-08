import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FullScreenTemplate } from 'app/components';
import { selectors } from 'app/store';
import { signUpRequest } from 'app/store/actions';
import * as Types from 'app/types';
import { language } from 'app/config/translations/i18n';

import { SignUpForm, SignUpFormData } from './components/SignUpForm';

export type Props = Types.RootStackScreenProps<Types.Route.SignUp>;

const initialValues: SignUpFormData = {
  email: '',
  password: '',
  termsAccepted: false,
  latitude: 0,
  longitude: 0,
  userType: '',
  language: ''
};

export const SignUpScreen: React.FC<Props> = ({route}) => {
  const isLoading = useSelector(selectors.isLoading);
  const dispatch = useDispatch();

  const signUpHandler = useCallback((values: SignUpFormData) => {
    const { latitude, longitude , userType: {id}} = route.params;
    values.latitude = latitude;
    values.longitude = longitude;
    values.userType = id;
    values.language = language;
    dispatch(signUpRequest(values));
  }, []);

  return (
    <FullScreenTemplate padded isLoading={isLoading}>
      <SignUpForm initialValues={initialValues} onSubmit={signUpHandler} loading={false} />
    </FullScreenTemplate>
  );
};
