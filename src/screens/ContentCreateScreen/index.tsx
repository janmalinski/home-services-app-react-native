import React, { useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { actions, selectors } from 'app/store';
import { FullScreenTemplate, Icon, } from 'app/components';
import { palette } from 'app/config/styles';
import { fullScreenModalScreenOptions, useScreenOptions } from 'app/lib/navigation';
import * as Types from 'app/types';
import { AdFormData, AdForm } from './components/AdForm';

export type Props = Types.RootStackScreenProps<Types.Route.ContentCreate>;

export const ContentCreateScreen = ({ navigation }: Props) => {
  const goBack = useCallback(() => navigation.goBack(), []);

  useScreenOptions({
    ...fullScreenModalScreenOptions,
    headerRight: () => <Icon name="close" size={28} onPress={goBack} color={palette.text} />,
  });

 const dispatch = useDispatch();
  const token = useSelector(selectors.isLoggedIn);
  const isServicesLoading = useSelector(selectors.isServicesLoading);
  const services = useSelector(selectors.getServices);
  const typeemployments = useSelector(selectors.getTypeemployments);

  useEffect(() => {
    dispatch(actions.getServicesRequest(token));
    dispatch(actions.getTypeemploymentRequest());
  }, []);

  const initialValues: AdFormData = {
    serviceIds: [],
    employmentTypeIds: [],
    dateAvailableFrom: new Date(),
    fixedTerm: false,
    dateAvailableTo: new Date(),
    location: '',
    coords: {
      latitude: 0,
      longitude: 0
    },
    description: '',
    setHoursWorkingTime: false,
    workingTime:[
      {
        "06-09": false,
        "09-12": false,
        "12-15": false,
        "15-18": false,
        "18-21": false,
        "21-24": false,
        "night": false
      },
      {
          "06-09": false,
          "09-12": false,
          "12-15": false,
          "15-18": false,
          "18-21": false,
          "21-24": false,
          "night": false
      },
      {
          "06-09": false,
          "09-12": false,
          "12-15": false,
          "15-18": false,
          "18-21": false,
          "21-24": false,
          "night": false
      },
      {
          "06-09": false,
          "09-12": false,
          "12-15": false,
          "15-18": false,
          "18-21": false,
          "21-24": false,
          "night": false
      },
      {
          "06-09": false,
          "09-12": false,
          "12-15": false,
          "15-18": false,
          "18-21": false,
          "21-24": false,
          "night": false
      },
      {
          "06-09": false,
          "09-12": false,
          "12-15": false,
          "15-18": false,
          "18-21": false,
          "21-24": false,
          "night": false
      },
      {
          "06-09": false,
          "09-12": false,
          "12-15": false,
          "15-18": false,
          "18-21": false,
          "21-24": false,
          "night": false
      },
  ]
  };

  const accountFormHandler = useCallback((values: AdFormData) => {
    const { description, serviceIds, employmentTypeIds, dateAvailableFrom, fixedTerm, dateAvailableTo, setHoursWorkingTime, workingTime, coords } = values;
    const workingTimeNegotiable = !setHoursWorkingTime;
    dispatch(
      actions.createAdRequest(
        token,
        description,
        serviceIds,
        employmentTypeIds,
        dateAvailableFrom,
        fixedTerm,
        dateAvailableTo,
        workingTimeNegotiable,
        workingTime
      ),
    );
  }, []);

  return (
    <FullScreenTemplate padded isLoading={isServicesLoading}>
      {typeemployments.length > 0 && services.length > 0 && (
        <AdForm
          initialValues={initialValues}
          services={services}
          typeemployments={typeemployments}
          loading={false}
          onSubmit={accountFormHandler}
        />
      )}
    </FullScreenTemplate>
  );
};
