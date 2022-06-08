import React, { useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';

import { FullScreenTemplate, StyledText } from 'app/components';
import { palette, typography } from 'app/config/styles';
import { i18n } from 'app/config/translations';
import * as Types from 'app/types';

import { ResetPasswordForm, ResetPasswordFormData } from './components/ResetPasswordForm';

export type Props = Types.RootStackNavigationProps<Types.Route.ResetPassword>;

const initialValues = {
  email: '',
};

export const ResetPasswordScreen: React.FC<Props> = () => {
  const resetPassword = useCallback((values: ResetPasswordFormData) => {
    try {
      Alert.alert(i18n.t('common:success'), i18n.t('resetPassword:resetPasswordSuccess'));
    } catch (error: any) {
      if (error.code === 404) {
        Alert.alert(i18n.t('common:error'), i18n.t('resetPassword:userNotFound'));
      } else {
        Alert.alert(i18n.t('common:error'), i18n.t('common:unknownError'));
      }
    }
  }, []);

  return (
    <FullScreenTemplate padded>
      <StyledText style={styles.guideText}>{i18n.t('resetPassword:guide1')}</StyledText>
      <StyledText style={styles.guideText}>{i18n.t('resetPassword:guide2')}</StyledText>
      <ResetPasswordForm initialValues={initialValues} onSubmit={resetPassword} loading={false} />
    </FullScreenTemplate>
  );
};

const styles = StyleSheet.create({
  guideText: {
    ...typography.body1,
    color: palette.textBlackMuted,
    marginVertical: 8,
  },
});
