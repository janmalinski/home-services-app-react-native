import { View, StyleSheet } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Config from 'react-native-config';

import { Icon } from 'app/components';
import { i18n } from 'app/config/translations';
import { palette, spacing } from 'app/config/styles';

interface Props{
  onAddressChange: (details: any) => void;
}

export const MapInput = ({onAddressChange}: Props) => {
  const ref = useRef<any>(null)
  const handleOnPressInput = useCallback((details) => {
    onAddressChange(details);
    ref?.current?.setAddressText('');
  },[onAddressChange]);

  
  const handleOnPressIcon = () =>   ref?.current?.focus() 

  return (
    <GooglePlacesAutocomplete 
      ref={ref}
      placeholder={i18n.t('map:searchOrMoveTheMap')}
      minLength={2}
      autoFocus={false}
      returnKeyType='search'
      keyboardAppearance='light' 
      listViewDisplayed
      fetchDetails
      nearbyPlacesAPI="GooglePlacesSearch"
      enablePoweredByContainer={false}
      debounce={200}
      renderDescription={row => row.description} 
      onPress={(_data, details = null) => {handleOnPressInput(details)}}
      query={{
          key: Config.GOOGLE_PLACES_API_KEY,
          language: 'en',
      }}
      renderRightButton={() => (
        <View style={styles.searchIconContainer}>
          <Icon type='ant-design' name='search1' color={palette.text} size={16} onPress={handleOnPressIcon}  />
        </View>
      )}
    />
   )
}

const styles = StyleSheet.create({
  searchIconContainer: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: spacing.small,
    backgroundColor: palette.backgroundLight
  }
})

