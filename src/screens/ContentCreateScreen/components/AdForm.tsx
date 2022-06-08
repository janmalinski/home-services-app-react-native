import { Formik, FormikProps } from 'formik';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View, PermissionsAndroid, Platform, Linking, Alert, ToastAndroid} from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import Geolocation from 'react-native-geolocation-service';

import { Button, Checkbox, TextInput, StyledText } from 'app/components';
import { palette, typography, spacing } from 'app/config/styles';
import { i18n } from 'app/config/translations';
import * as Types from 'app/types';
import { TimeOfDayCheckboxes } from './TimeOfDayCheckboxes';

export interface workingTimeRecord {
  "06-09": boolean;
  "09-12": boolean;
  "12-15": boolean;
  "15-18": boolean;
  "18-21": boolean;
  "21-24": boolean;
  "night": boolean;
}

export interface Coords{
  latitude: number;
  longitude: number;
}
export interface AdFormData {
  serviceIds: string[];
  employmentTypeIds: string[];
  dateAvailableFrom: Date;
  fixedTerm: boolean;
  dateAvailableTo: Date;
  location: string;
  description: string;
  setHoursWorkingTime: boolean;
  workingTime: workingTimeRecord[]
  coords: Coords
}

export interface Props {
  initialValues: AdFormData;
  loading: boolean;
  services: Types.Service[];
  typeemployments: Types.Typeemployment[];
  onSubmit: (values: AdFormData) => void;
}

const validationSchema = Yup.object().shape({
  serviceIds: Yup.array().of(Yup.string()).required(i18n.t('validation:required')),
  employmentTypeIds: Yup.array().of(Yup.string()).required(i18n.t('validation:required')),
  dateAvailableFrom: Yup.date().required(i18n.t('validation:required')),
  dateAvailableTo: Yup.date().required(i18n.t('validation:required')),
  fixedTerm: Yup.boolean().required(i18n.t('validation:required')),
  description: Yup.string().required(i18n.t('validation:required')),
  location: Yup.string().required(i18n.t('validation:required')),
});  

export const AdForm: React.FC<Props> = ({
  initialValues,
  loading,
  services,
  typeemployments,
  onSubmit,
}) => {
  const checkedEmploymentTypes: {id: string, name: string}[] = [];
  const checkedServices: string[] = [];

  useEffect(()=>{getLocation()},[]);

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
  
  const getLocation = async() => {
    const hasLocationPermissionCheck = await hasLocationPermission();
  
    if(!hasLocationPermissionCheck){
        return;
      }
      Geolocation.getCurrentPosition(position=>{
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        initialValues.coords = coords;
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
    )
  }

  const handleSetValue = (
    type: string,
    value: string | Date | boolean,
    setFieldValue: {
      (field: string, value: string | Date | boolean | {id: string, name: string}, shouldValidate?: boolean | undefined): void;
      (arg0: string, arg1: string[]): void;
    },
    name?: string
  ) => {
    switch (type) {
      case 'services':
        const clickedService = checkedServices.indexOf(value as string);
        if (clickedService === -1) {
          checkedServices.push(value as string);
        } else {
          checkedServices.splice(clickedService, 1);
        }
        return setFieldValue('serviceIds', checkedServices);

      case 'employmentTypes':
        const clickedEmploymentType = checkedEmploymentTypes.map(el=>el.id).indexOf(value as string);
        if (clickedEmploymentType === -1) {
          checkedEmploymentTypes.push({id: value as string, name: name as string});
        } else {
          checkedEmploymentTypes.splice(clickedEmploymentType, 1);
        }
        return setFieldValue('employmentTypeIds', checkedEmploymentTypes.map(el=>el.id));

      case 'dateAvailableFrom':
        return setFieldValue('dateAvailableFrom', value);

      case 'dateAvailableTo':
        return setFieldValue('dateAvailableTo', value);

      case 'setHoursWorkingTime':
        return setFieldValue('setHoursWorkingTime', value);

      case 'location':
        return setFieldValue('location', value);

      default:
        return false;
    }
  };

  const handleworkingTime =   (value: boolean, index: number, setFieldValue:  {
    (field: string, value: string | Date | boolean | workingTimeRecord[], shouldValidate?: boolean | undefined): void;
    (arg0: string, arg1: string[]): void;
  }, workingTime:  workingTimeRecord[], range: string) => {
    const upadatedworkingTime = workingTime.map((el, i) =>  i === index ? { ...el , [range]: value} : el)
    setFieldValue('workingTime', upadatedworkingTime);
  }

  const renderForm = useCallback(
    (formProps: FormikProps<AdFormData>) => {
      const { handleChange, handleBlur, setFieldValue, values, handleSubmit, errors, touched } = formProps;
      return (
        <View>
          <StyledText style={styles.label}>
            {i18n.t('adCreateemploymentType')}
          </StyledText>
          <View style={[styles.row, styles.marginBottomRegular]}>
            {typeemployments.map((typeemployment) => (
              <Button
                key={typeemployment.id}
                buttonStyle={[
                  { marginBottom: 10 },
                  values.employmentTypeIds.includes(typeemployment.id)
                    ? { backgroundColor: '#def5f1' }
                    : { backgroundColor: '#F6F6F6' },
                ]}
                titleStyle={styles.buttonTitle}
                title={typeemployment.name}
                onPress={() => handleSetValue('employmentTypes', typeemployment.id, setFieldValue, typeemployment.name)}
              />
            ))}
            {errors.employmentTypeIds && touched.employmentTypeIds && (
              <StyledText style={styles.errorMessage}>{errors.employmentTypeIds}</StyledText>
            )}
          </View>
          <View style={styles.marginBottomRegular}>
            <StyledText style={styles.label}>{i18n.t('adCreateavailableFrom')}</StyledText>
            <DatePicker
              date={values.dateAvailableFrom}
              onDateChange={(date) => handleSetValue('dateAvailableFrom', date, setFieldValue)}
              androidVariant={Platform.OS === 'android' ? 'nativeAndroid' : undefined}
              mode="date"
            />
            {checkedEmploymentTypes.filter(el => el.name === 'Once').length === 0 && 
              <Checkbox
              checked={values.fixedTerm}
              onPress={() => setFieldValue('fixedTerm', !values.fixedTerm)}
              label={i18n.t('adCreatefixedTerm')}
              containerStyle={styles.checkboxContainer}
            />  
            }
          </View>
          {checkedEmploymentTypes.filter(el => el.name === 'Once').length === 0 && values.fixedTerm && (
            <View style={styles.marginBottomRegular}>
              <StyledText style={styles.label}>{i18n.t('adCreateavailableTo')}</StyledText>
              <DatePicker
                date={values.dateAvailableTo}
                onDateChange={(date) => handleSetValue('dateAvailableTo', date, setFieldValue)}
                androidVariant={Platform.OS === 'android' ? 'nativeAndroid' : undefined}
                mode="date"
              />
            </View>
          )}
          <View style={styles.marginBottomRegular}>
            <StyledText style={styles.label}>{i18n.t('adCreateservices')}</StyledText>
            {services.map((service) => (
              <Checkbox
                key={service.id}
                checked={checkedServices.includes(service.id)}
                onPress={() => handleSetValue('services', service.id, setFieldValue)}
                label={service.name}
                containerStyle={styles.checkboxContainer}
              />
            ))}
            {errors.serviceIds && touched.serviceIds && (
              <StyledText style={styles.errorMessage}>{errors.serviceIds}</StyledText>
            )}
          </View>
          <View style={styles.marginBottomRegular}>
            <StyledText style={styles.label}>{i18n.t('adCreatesetHoursWorkingTime')}</StyledText>
            <View style={styles.rowTwoButtons}>
              <Button
                buttonStyle={[
                  styles.buttonHalfScreen,
                  values.setHoursWorkingTime === false
                    ? { backgroundColor: '#def5f1' }
                    : { backgroundColor: '#F6F6F6' },
                ]}
                titleStyle={styles.buttonTitle}
                title={i18n.t('adCreateworkingTimeNegotiable')}
                onPress={() => handleSetValue('setHoursWorkingTime', false, setFieldValue)}
              />
              <Button
                buttonStyle={[
                  styles.buttonHalfScreen,
                  ,
                  values.setHoursWorkingTime === true
                    ? { backgroundColor: '#def5f1' }
                    : { backgroundColor: '#F6F6F6' },
                ]}
                titleStyle={styles.buttonTitle}
                title={i18n.t('adCreatesetHoursWorkingTimeSetHours')}
                onPress={() => handleSetValue('setHoursWorkingTime', true, setFieldValue)}
              />
            </View>
            {values.setHoursWorkingTime && (
             <TimeOfDayCheckboxes setFieldValue={setFieldValue} workingTime={values.workingTime} handleOnPress={handleworkingTime} />
            )}
          </View>
          <View style={styles.marginBottomRegular}>
            <StyledText style={styles.label}>{i18n.t('adCreatelocation')}</StyledText>
            <TextInput
              withBorder
              errorMessage={errors.location && touched.location && errors.location}
              secureTextEntry={false}
              value={values.location}
              onChangeText={handleChange('location')}
              onBlur={handleBlur('location')}
              autoCapitalize="none"
              blurOnSubmit
            />
          </View>
          <View style={styles.marginBottomRegular}>
            <StyledText style={styles.label}>{i18n.t('adCreatedescription')}</StyledText>
            <TextInput
              size='textArea'
              withBorder
              errorMessage={errors.description && touched.description && errors.description}
              secureTextEntry={false}
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              autoCapitalize="none"
              blurOnSubmit
              // multiline
              // numberOfLines={10}
              style={{
                height: 160,
                ...Platform.select({
                  android: {
                    textAlignVertical: 'top',
                  },
                  ios: {
                    paddingTop: 0,
                  },
                }),
              }}
            />
          </View>
          <Button
            onPress={handleSubmit}
            title={i18n.t('common:save')}
            containerStyle={styles.button}
            loading={loading}
          />
        </View>
      );
    },
    [loading],
  );

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {renderForm}
    </Formik>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rowDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowTwoButtons: {
    flexDirection: 'row',
  },
  greyBackground: {
    backgroundColor: palette.backgroundDark,
    alignItems: 'center',
  },
  button: {
    marginTop: 8,
  },
  buttonTitle: {
    color: palette.grayscale09,
  },
  checkboxContainer: {
    marginBottom: 0,
  },
  label: {
    ...typography.subtitle1,
    marginBottom: spacing.tiny
  },
  errorMessage: {
    ...typography.hints,
    color: palette.error,
  },
  buttonHalfScreen: {
    width: '75%',
    marginBottom: spacing.regular
  },
  marginBottomRegular:{
    marginBottom: spacing.regular
  }
});
