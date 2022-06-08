import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button, FullScreenTemplate } from 'app/components';
import { palette, typography } from 'app/config/styles';
import { i18n } from 'app/config/translations';
import { signInRequest } from 'app/store/actions';
import * as Types from 'app/types';

import { SignInForm, SignInFormData } from './components/SignInForm';
import { selectors } from 'app/store';

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
        <Button
          type="clear"
          title={i18n.t('signIn:forgotPassword')}
          onPress={navigateToResetPassword}
        />
      </View>
      {/* <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.socialAuthButtons}>
        <Button
          testID="WelcomeScreen.SignIn"
          title={i18n.t('signIn:continueWithApple')}
          onPress={navigateToResetPassword}
        />
        <Button
          testID="WelcomeScreen.SignIn"
          title={i18n.t('signIn:continueWithFacebook')}
          onPress={navigateToResetPassword}
        />
        <Button
          testID="WelcomeScreen.SignIn"
          title={i18n.t('signIn:continueWithGoogle')}
          onPress={navigateToResetPassword}
        />
      </View> */}
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
  socialAuthButtons: {
    height: 200,
    justifyContent: 'space-evenly',
  },
  dividerContainer: {
    height: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  divider: {
    flex: 0.48,
    alignSelf: 'center',
    height: 1,
    backgroundColor: palette.grayscale03,
  },
  dividerText: {
    ...typography.caption,
  },
});
