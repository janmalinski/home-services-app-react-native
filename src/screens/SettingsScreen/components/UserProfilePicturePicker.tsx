import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import ImagePicker, { Options } from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';

import { Icon } from 'app/components';
import { palette, spacing } from 'app/config/styles';
import { selectors } from 'app/store';
import { uploadUserAvatarRequest } from 'app/store/actions';

import { UserProfilePicture } from './UserProfilePicture';

const imageOptions: Options = {
  width: 512,
  height: 512,
  compressImageQuality: 0.8,
  cropping: true,
  cropperCircleOverlay: true,
  multiple: false,
};

interface Props {
  initialImageURL: string;
}

export const UserProfilePicturePicker: React.FC<Props> = ({ initialImageURL }) => {
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(initialImageURL);
  const dispatch = useDispatch();
  const token = useSelector(selectors.isLoggedIn);
  const user = useSelector(selectors.getUser);

  useEffect(() => {
    setImageURL(Config.DOMAIN_URL + user.avatarURL);
  }, [user]);

  const openPicker = useCallback(async () => {
    try {
      const result = await ImagePicker.openPicker(imageOptions);
      const image = Array.isArray(result) ? result[0] : result;
      setLoading(true);
      const avatarUri = image.path;
      setImageURL(avatarUri);
      dispatch(uploadUserAvatarRequest(token, avatarUri));
    } catch (error) {
      console.log('openPickewrError', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <UserProfilePicture imageURL={imageURL} loading={loading} />
      <Icon
        testID="UserProfile.EditIcon"
        size={48}
        name="pencil-circle"
        color={palette.grayscale00}
        containerStyle={styles.iconContainer}
        onPress={openPicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.regular,
    paddingBottom: spacing.xLarge,
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    backgroundColor: palette.primaryDefault,
    borderRadius: 30,
    top: 0,
    left: '58%',
  },
});
