import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { verifyRequest } from 'app/store/actions';
import { FullScreenTemplate } from 'app/components';
import { selectors, actions } from 'app/store';
import * as Types from 'app/types';

import { RegistrationCodeSignUpForm, RegistrationCodeSignUpFormData } from './components/RegistrationCodeSignupForm';


export type Props = Types.RootStackScreenProps<Types.Route.RegistrationCodeSignUp>;

const initialValues: RegistrationCodeSignUpFormData = {
  code: ''
};

export const RegistrationCodeSignUpScreen = ({ navigation }: Props) => {

  const isLoading = useSelector(selectors.isLoading);
  const isVerificationEmailSent = useSelector(selectors.isVerificationEmailSent)
  const dispatch = useDispatch();

  useEffect(()=> navigation.addListener('beforeRemove', e => {
    if(isVerificationEmailSent === false){
      console.log('NOT_SENT')
      return;
    }
    e.preventDefault();
    dispatch(actions.setAlert('Check your email inbox. And submit form with provided verification code', 'info'))
  }),[navigation, isVerificationEmailSent])

  const registerCodeSignUpHandler = useCallback((values: RegistrationCodeSignUpFormData) => {
    dispatch(verifyRequest(values));
  }, []);

  return (
    <FullScreenTemplate padded isLoading={isLoading}>
      <RegistrationCodeSignUpForm initialValues={initialValues} onSubmit={registerCodeSignUpHandler} loading={false} />
    </FullScreenTemplate>
  );
};
