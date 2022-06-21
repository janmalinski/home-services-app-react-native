import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FullScreenTemplate } from 'app/components';
import { actions, selectors } from 'app/store';
import * as Types from 'app/types';

import { AdFormData, AdForm } from './components/AdForm';

export type Props = Types.MainTabScreenProps<Types.Route.AdCreate>;

export const AdCreateScreen = ({ navigation, route }: Props) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();
  const token = useSelector(selectors.isLoggedIn);
  const user = useSelector(selectors.getUser);
  const userRoles = user?.roles;
  const isServicesLoading = useSelector(selectors.isServicesLoading);
  const services = useSelector(selectors.getServices);
  const typeemployments = useSelector(selectors.getTypeemployments);
  const isAdCreated = useSelector(selectors.isAdCreated);

  useEffect(() => {
    dispatch(actions.getUserRequest(token));
    dispatch(actions.getServicesRequest(token));
    dispatch(actions.getTypeemploymentRequest());
  }, []);

  useEffect(() => {
    if (route.params?.latitude && route.params?.longitude && route.params?.address) {
      const { latitude, longitude, address } = route.params;
      setLatitude(latitude);
      setLongitude(longitude);
      setAddress(address);
    }
  }, [route.params?.latitude, route.params?.longitude, route.params?.address]);

  const initialValues: AdFormData = {
    serviceIds: [],
    employmentTypeIds: [],
    dateAvailableFrom: new Date(),
    fixedTerm: false,
    dateAvailableTo: new Date(),
    description: '',
    setHoursWorkingTime: {
      negotiable: null,
      setHours: null,
    },
    address: '',
    latitude: 0,
    longitude: 0,
    workingTime: [
      {
        '06-09': false,
        '09-12': false,
        '12-15': false,
        '15-18': false,
        '18-21': false,
        '21-24': false,
        night: false,
      },
      {
        '06-09': false,
        '09-12': false,
        '12-15': false,
        '15-18': false,
        '18-21': false,
        '21-24': false,
        night: false,
      },
      {
        '06-09': false,
        '09-12': false,
        '12-15': false,
        '15-18': false,
        '18-21': false,
        '21-24': false,
        night: false,
      },
      {
        '06-09': false,
        '09-12': false,
        '12-15': false,
        '15-18': false,
        '18-21': false,
        '21-24': false,
        night: false,
      },
      {
        '06-09': false,
        '09-12': false,
        '12-15': false,
        '15-18': false,
        '18-21': false,
        '21-24': false,
        night: false,
      },
      {
        '06-09': false,
        '09-12': false,
        '12-15': false,
        '15-18': false,
        '18-21': false,
        '21-24': false,
        night: false,
      },
      {
        '06-09': false,
        '09-12': false,
        '12-15': false,
        '15-18': false,
        '18-21': false,
        '21-24': false,
        night: false,
      },
    ],
  };

  const submitHandler = useCallback((values: AdFormData) => {
    const {
      description,
      serviceIds,
      employmentTypeIds,
      dateAvailableFrom,
      fixedTerm,
      dateAvailableTo,
      setHoursWorkingTime,
      workingTime,
      address,
      latitude,
      longitude,
    } = values;

    const { negotiable } = setHoursWorkingTime;

    dispatch(
      actions.createAdRequest(
        token,
        description,
        serviceIds,
        employmentTypeIds,
        dateAvailableFrom,
        fixedTerm,
        dateAvailableTo,
        negotiable as boolean,
        workingTime,
        address,
        latitude,
        longitude,
      ),
    );
  }, []);

  return (
    <FullScreenTemplate padded isLoading={isServicesLoading}>
      {typeemployments.length > 0 && services.length > 0 && (
        <AdForm
          enableReinitialize={isAdCreated}
          initialValues={initialValues}
          services={services}
          typeemployments={typeemployments}
          loading={false}
          onSubmit={submitHandler}
          navigation={navigation}
          roles={userRoles}
          latitude={latitude}
          longitude={longitude}
          address={address}
        />
      )}
    </FullScreenTemplate>
  );
};
