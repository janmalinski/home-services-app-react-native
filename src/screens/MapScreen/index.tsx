import React, { useEffect, useState} from 'react';
import { StyleSheet, PermissionsAndroid, Platform, Linking, Alert, ToastAndroid, View, Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import Config from 'react-native-config';

import { palette, spacing } from 'app/config/styles';
import { MapInput } from './components/MapInput';
import { Map } from './components/Map';
import { Button,  FullScreenTemplate,  LoadingIndicator, StyledText } from 'app/components';
import * as Types from 'app/types';
import { i18n } from 'app/config/translations';

type LatitudeLongitude = Pick<Types.Coordinates, 'latitude' | 'longitude'>

  const { height, width } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;

type Props = Types.RootStackScreenProps<Types.Route.Map>;

export const MapScreen = ({route, navigation}: Props) => {

const [coordinates, setCoordinates] = useState<Types.Coordinates>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0028,
    longitudeDelta: 0.0028 * ASPECT_RATIO ,
    });

const [address, setAddress] = useState<string>('');
const [addressChangedByInput, setAddressChangeByInput] = useState(false);

useEffect(()=>{
    hasLocationPermission().then(()=>getLocation());
    Geocoder.init(Config.GEOCODING_API_KEY);
},[])

const hasLocationPermissionIOS = async() =>{
  const openSettings = () => {
    Linking.openSettings().catch(()=>{
      Alert.alert(i18n.t('adCreateunableOpenSetting'))
    })
  }
  const status = await Geolocation.requestAuthorization('whenInUse');

  if(status === 'granted'){
    return true;
  }

  if(status === 'denied'){
    Alert.alert('adCreatelocationPermissionDenied');
  }

  if(status === 'disabled'){
    Alert.alert(
      i18n.t('add:locationDisabled'),
      '',
      [
        { text: i18n.t('add:goToSettings'), onPress: openSettings },
        { text: i18n.t('add:dontUseLocation'), onPress: () => {} },
      ],
    );
  }
  return false;
}
  
  const hasLocationPermission = async() => {
    if(Platform.OS === 'ios'){
      const hasPermission = await hasLocationPermissionIOS();
      return hasPermission;
    }
  
    if(Platform.OS === 'android' && Platform.Version < 23){
      return true;
    }
  
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
  
    if(hasPermission){
      return true;
    }
  
    const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  
    if(status === PermissionsAndroid.RESULTS.GRANTED){
      return true;
    }
  
    if(status === PermissionsAndroid.RESULTS.DENIED){
      ToastAndroid.show(
       i18n.t('add:locationPermissionDenied'),
        ToastAndroid.LONG,
      );
    } else if(status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN){
      ToastAndroid.show(
       i18n.t('add:locationPermisssionRevoked'),
        ToastAndroid.LONG,
      );
    }
    return false;
  } 
  
  const getAddressFromCoords = async(coords: LatitudeLongitude) => {
    const response = await Geocoder.from(coords);
    return response.results[0].formatted_address;
  }

  const getLocation = async() => {
    const hasLocationPermissionCheck = await hasLocationPermission();
  
    if(!hasLocationPermissionCheck){
        return;
      }
      Geolocation.getCurrentPosition(async position=>{
        const { coords: {latitude, longitude}} = position;
        const coords = {
          latitude,
          longitude,
          latitudeDelta: 0.0028,
          longitudeDelta: 0.0028 * ASPECT_RATIO,  
        }
        setCoordinates(coords);
        const address = await getAddressFromCoords({latitude, longitude});
        setAddress(address);
      },
      (error) => {
        console.log('LOCATION_ERROR', error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        timeout: 15000,
        maximumAge: 10000,
      }
    )};

  const handleAddressChange = (details: any) => {
    const { geometry: {location: { lat, lng}} } = details;
    const coords = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0028,
      longitudeDelta: 0.0028 * ASPECT_RATIO,  
    }
    setCoordinates(coords);
    setAddressChangeByInput(true)
  }

  const handleRegionChange = async(coordinates: Types.Coordinates) => {
    setCoordinates(coordinates);
    const {latitude,longitude} = coordinates;
    const address = await getAddressFromCoords({latitude, longitude});
    setAddress(address);
  }

  const handleConfirmLocation = async() => {

    const { latitude, longitude } = coordinates;
    const { userType, redirectAfterSubmit }= route.params;
    
    if(redirectAfterSubmit === Types.Route.SignUp) {
      navigation.navigate(redirectAfterSubmit, {latitude, longitude, userType})
    } else if(redirectAfterSubmit === Types.Route.AdCreate){
      navigation.navigate(redirectAfterSubmit, { latitude, longitude, address })
    }
  }

  const userType = route.params.userType;

  return (
        <FullScreenTemplate noScroll>
        {coordinates.latitude === 0 && coordinates.longitude === 0 ? 
          <View style={styles.centeredContainer}>
            <LoadingIndicator/> 
          </View>
          :
          <View style={styles.container}>
            <View style={styles.searchInputContainer}>
              <View style={[styles.container, styles.questionContainer]}>
                <StyledText style={styles.questionText}>{userType.name === 'Client' ? i18n.t('map:whereAreYouLookingForHelp') : i18n.t('map:whichAreYouWantToWork') }</StyledText>
              </View>
              <MapInput onAddressChange={address=> handleAddressChange(address)} />
            </View>
            <Map addressChangedByInput={addressChangedByInput} coordinates={coordinates} onRegionChange={handleRegionChange}  resetAddressChangedByInput={setAddressChangeByInput
            } />
            <View style={styles.bottomBox}>
              <StyledText style={styles.addressText}>{address}</StyledText>
              <Button title='Confirm Location' onPress={handleConfirmLocation}/>
            </View>
          </View>
        }
        </FullScreenTemplate>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.backgroundLight,
    },
    centeredContainer: {
      flex: 1,
      backgroundColor: palette.backgroundLight,
      justifyContent: 'center',
      alignItems: 'center'
    },
    searchInputContainer: {
      position: 'absolute',
      top: 20,
      left: 20,
      right: 20,
      zIndex: 100,
      backgroundColor: palette.backgroundLight,
      borderRadius: 4
    },
    bottomBox: {
      position: 'absolute',
      height: 150,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: palette.backgroundLight,
      paddingHorizontal: spacing.regular,
      paddingTop: spacing.regular
    },
    addressText:{
      marginBottom: spacing.xxLarge
    },
    questionContainer: {
      padding: 10,
      backgroundColor: palette.backgroundLight,
      borderRadius: 4,
      borderBottomColor: palette.border,
      borderBottomWidth: 1,
    },
    questionText: {
      fontSize: 18,
    }
})