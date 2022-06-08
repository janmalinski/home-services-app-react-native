import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FullScreenTemplate } from 'app/components';
import { actions, selectors } from 'app/store';
import * as Types from 'app/types';

import { AccountFormData, AccountForm } from './components/AccountForm';

export type Props = Types.RootStackScreenProps<Types.Route.Account>;

export const AccountScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectors.isLoggedIn);
  const user = useSelector(selectors.getUser);
  useEffect(() => {
    dispatch(actions.getServicesRequest(token));
  }, []);

  const initialValues: AccountFormData = {
    firstName: user.name || '',
    phoneNumber: user.phoneNumber || '',
    consentPhoneNumberVisibility: user.phoneNumberConsent || false,
    email: user.email || '',
  };

  const accountFormHandler = useCallback((values: AccountFormData) => {
    dispatch(actions.updateUserRequest(token, values));
    navigation.navigate(Types.Route.MainTab as any);
  }, []);

  return (
    <FullScreenTemplate padded>
      <AccountForm initialValues={initialValues} loading={false} onSubmit={accountFormHandler} />
    </FullScreenTemplate>
  );
};
