import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon, LoadingIndicator, Image } from 'app/components';
import { palette } from 'app/config/styles';

export interface Props {
  loading: boolean;
  imageURL: string;
}

export const UserProfilePicture: React.FC<Props> = ({ loading, imageURL }) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingIndicator />
      </View>
    );
  }

  if (imageURL) {
    return <Image source={{ uri: imageURL }} style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Icon testID="icon" name="account" size={64} iconStyle={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 160,
    borderRadius: 160,
    backgroundColor: palette.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 0,
  },
});
