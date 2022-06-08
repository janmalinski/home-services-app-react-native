import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { DialogTemplate } from 'app/components';
import { i18n } from 'app/config/translations';
import * as actions from 'app/store/actions';
import * as Types from 'app/types';

export type Props = Types.RootStackScreenProps<Types.Route.SingOutDialog>;

export const SignOutDialogScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const signOut = useCallback(() => {
    dispatch(actions.signOut());
  }, []);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <DialogTemplate
      title={i18n.t('settings:signOutTitle')}
      description={i18n.t('settings:signOutDialogDescription')}
      proceedButtonLabel={i18n.t('settings:signOutAction')}
      cancelButtonLabel={i18n.t('common:no')}
      onProceed={signOut}
      onCancel={goBack}
      onBackdropPress={goBack}
    />
  );
};
