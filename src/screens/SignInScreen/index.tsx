import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button, FullScreenTemplate } from 'app/components';
import { i18n } from 'app/config/translations';
import { selectors } from 'app/store';
import { signInRequest } from 'app/store/actions';
import * as Types from 'app/types';

import { SignInForm, SignInFormData } from './components/SignInForm';

const initialValues: SignInFormData = {
  email: '',
  password: '',
};

export type Props = Types.RootStackScreenProps<Types.Route.SignIn>;

export const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.isLoading);

  const signInHandler = useCallback((values: SignInFormData) => {
    dispatch(signInRequest(values));
  }, []);

  const navigateToResetPassword = useCallback(() => {
    navigation.navigate(Types.Route.ResetPassword);
  }, []);

  return (
    <FullScreenTemplate padded isLoading={isLoading}>
      <SignInForm initialValues={initialValues} onSubmit={signInHandler} loading={false} />
      <View style={styles.row}>
        <Button type="clear" title={i18n.t('signIn:forgotPassword')} onPress={navigateToResetPassword} />
      </View>
    </FullScreenTemplate>
  );
};

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
