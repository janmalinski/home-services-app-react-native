import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { FullScreenTemplate, ListItem, WavyHeader } from 'app/components';
import { palette, spacing } from 'app/config/styles';
import { i18n } from 'app/config/translations';
import { useScreenOptions } from 'app/lib/navigation';
import { actions, selectors } from 'app/store';
import * as Types from 'app/types';

import { UserProfilePicturePicker } from './components/UserProfilePicturePicker';

export type Props = Types.MainTabScreenProps<Types.Route.Settings>;

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectors.getUser);
  const token = useSelector(selectors.isLoggedIn);

  const openSignOutDialog = useCallback(() => {
    navigation.navigate(Types.Route.SingOutDialog);
  }, []);

  const goToAccount = useCallback(() => {
    navigation.navigate(Types.Route.Account);
  }, []);

  useScreenOptions({
    headerColor: 'primary',
  });

  useEffect(() => {
    dispatch(actions.getUserRequest(token));
  }, []);

  const Header = (
    <View style={styles.header}>
      <WavyHeader style={styles.wave} height={200} top={165} color={palette.primaryDefault} />
      <UserProfilePicturePicker initialImageURL={user.avatarURL} />
    </View>
  );

  return (
    <FullScreenTemplate header={Header} padded bottomNavigationPad isLoading={user.isLoading}>
      <ListItem
        leftComponent="icon"
        icon={{ name: 'account' }}
        title={i18n.t('settings:account')}
        onPress={goToAccount}
      />
      <ListItem
        leftComponent="icon"
        icon={{ name: 'logout-variant' }}
        title={i18n.t('settings:signOutTitle')}
        subtitle={i18n.t('settings:signOutSubtitle')}
        onPress={openSignOutDialog}
      />
    </FullScreenTemplate>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 280,
  },
  wave: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    marginHorizontal: -spacing.large,
  },
});
