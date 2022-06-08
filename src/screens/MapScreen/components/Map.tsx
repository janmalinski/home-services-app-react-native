import { StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import * as Types from 'app/types';

interface Props {
  addressChangedByInput: boolean;
  coordinates:Types.Coordinates;
  onRegionChange: (reg: Types.Coordinates) => void;
  resetAddressChangedByInput: (value: boolean) =>void;
}

export const Map = ({addressChangedByInput, coordinates, onRegionChange, resetAddressChangedByInput}: Props) => {

  const [panDrag, setPanDrag] = useState(false);
  const mapRef = useRef(null);

  const handleRegionChangeComplete = (location: Types.Coordinates) => {
    if(location.latitude.toFixed(6) != coordinates.latitude.toFixed(6)
    && location.longitude.toFixed(6) != coordinates.longitude.toFixed(6)){
      return onRegionChange(location);
    } else if(addressChangedByInput){
      onRegionChange(location);
      return resetAddressChangedByInput(false)
    }
    return;
  }

  return (
    <>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={coordinates}
        mapType="standard"
        zoomEnabled
        showsMyLocationButton
        showsIndoors={false}
        showsIndoorLevelPicker={false}
        minZoomLevel={5}
        onPanDrag={()=> setPanDrag(true)}
        onPress={()=> setPanDrag(true)}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
       <Marker coordinate={coordinates}  />
      </MapView>
    </>)
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        },
})