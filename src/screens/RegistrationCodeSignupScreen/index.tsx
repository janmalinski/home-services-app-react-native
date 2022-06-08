import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { verifyRequest } from 'app/store/actions';
import { FullScreenTemplate } from 'app/components';
import { selectors } from 'app/store';
import * as Types from 'app/types';

import { RegistrationCodeSignUpForm, RegistrationCodeSignUpFormData } from './components/RegistrationCodeSignupForm';

export type Props = Types.RootStackScreenProps<Types.Route.RegistrationCodeSignUp>;

const initialValues: RegistrationCodeSignUpFormData = {
  code: ''
};

export const RegistrationCodeSignUpScreen = () => {
  const isLoading = useSelector(selectors.isLoading);
  const dispatch = useDispatch();

  const registerCodeSignUpHandler = useCallback((values: RegistrationCodeSignUpFormData) => {
    dispatch(verifyRequest(values));
  }, []);

  return (
    <FullScreenTemplate padded isLoading={isLoading}>
      <RegistrationCodeSignUpForm initialValues={initialValues} onSubmit={registerCodeSignUpHandler} loading={false} />
    </FullScreenTemplate>
  );
};
