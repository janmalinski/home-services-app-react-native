import React, { useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Config from 'react-native-config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { Icon } from 'app/components';
import { palette, spacing } from 'app/config/styles';
import { i18n } from 'app/config/translations';

interface Props {
  onAddressChange: (details: any) => void;
}

export const MapInput = ({ onAddressChange }: Props) => {
  const ref = useRef<any>(null);
  const handleOnPressInput = useCallback(
    (details) => {
      onAddressChange(details);
      ref?.current?.setAddressText('');
    },
    [onAddressChange],
  );

  const handleOnPressIcon = () => ref?.current?.focus();

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder={i18n.t('map:searchOrMoveTheMap')}
      minLength={2}
      listViewDisplayed
      fetchDetails
      nearbyPlacesAPI="GooglePlacesSearch"
      enablePoweredByContainer={false}
      debounce={200}
      renderDescription={(row) => row.description}
      onPress={(_data, details = null) => {
        handleOnPressInput(details);
      }}
      query={{
        key: Config.GOOGLE_PLACES_API_KEY,
        language: 'en',
      }}
      renderRightButton={() => (
        <View style={styles.searchIconContainer}>
          <Icon
            type="ant-design"
            name="search1"
            color={palette.text}
            size={16}
            onPress={handleOnPressIcon}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  searchIconContainer: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: spacing.small,
    backgroundColor: palette.backgroundLight,
  },
});
