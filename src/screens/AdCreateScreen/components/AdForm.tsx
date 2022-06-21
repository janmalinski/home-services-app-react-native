import { Formik, FormikProps } from 'formik';
import React, { useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';

import { Button, Checkbox, TextInput, StyledText } from 'app/components';
import { palette, typography, spacing } from 'app/config/styles';
import { i18n } from 'app/config/translations';
import * as Types from 'app/types';

import { TimeOfDayCheckboxes } from './TimeOfDayCheckboxes';

export interface workingTimeRecord {
  '06-09': boolean;
  '09-12': boolean;
  '12-15': boolean;
  '15-18': boolean;
  '18-21': boolean;
  '21-24': boolean;
  night: boolean;
}

export interface AdFormData {
  serviceIds: string[];
  employmentTypeIds: string[];
  dateAvailableFrom: Date;
  fixedTerm: boolean;
  dateAvailableTo: Date;
  description: string;
  setHoursWorkingTime: {
    negotiable: null | boolean;
    setHours: null | boolean;
  };
  address: string;
  latitude: number;
  longitude: number;
  workingTime: workingTimeRecord[];
}

export interface Props {
  enableReinitialize: boolean;
  initialValues: AdFormData;
  loading: boolean;
  services: Types.Service[];
  typeemployments: Types.Typeemployment[];
  onSubmit: (values: AdFormData) => void;
  navigation: Types.MainTabScreenProps<Types.Route.AdCreate>['navigation'];
  roles: [
    {
      id: string;
      name: string;
    },
  ];
  latitude?: number;
  longitude?: number;
  address?: string;
}

const validationSchema = Yup.object().shape({
  serviceIds: Yup.array().min(1, 'Select at least one service'),
  employmentTypeIds: Yup.array().min(1, 'Select at least one employment type'),
  dateAvailableFrom: Yup.date().required(i18n.t('validation:required')),
  dateAvailableTo: Yup.date().required(i18n.t('validation:required')),
  fixedTerm: Yup.boolean().required(i18n.t('validation:required')),
  setHoursWorkingTime: Yup.object().shape({
    negotiable: Yup.boolean().required(i18n.t('validation:required')),
    setHours: Yup.boolean().required(i18n.t('validation:required')),
  }),
  address: Yup.string().required('Detect location or set location manually'),
  description: Yup.string().required('Description is required'),
});

export const AdForm: React.FC<Props> = ({
  enableReinitialize,
  initialValues,
  loading,
  services,
  typeemployments,
  onSubmit,
  navigation,
  roles,
  latitude,
  longitude,
  address,
}) => {
  const checkedEmploymentTypes: { id: string; name: string }[] = [];
  const checkedServices: string[] = [];
  const formRef = useRef<FormikProps<AdFormData>>(null);

  useEffect(() => {
    formRef?.current?.setFieldValue('address', address);
    formRef?.current?.setFieldValue('latitude', latitude);
    formRef?.current?.setFieldValue('longitude', longitude);
  }, [address, latitude, longitude]);

  const handleSetValue = (
    type: string,
    value: string | Date | boolean,
    setFieldValue: {
      (
        field: string,
        value: string | Date | boolean | { id: string; name: string },
        shouldValidate?: boolean | undefined,
      ): void;
      (arg0: string, arg1: string[]): void;
    },
    name?: string,
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
        const clickedEmploymentType = checkedEmploymentTypes.map((el) => el.id).indexOf(value as string);
        if (clickedEmploymentType === -1) {
          checkedEmploymentTypes.push({ id: value as string, name: name as string });
        } else {
          checkedEmploymentTypes.splice(clickedEmploymentType, 1);
        }
        return setFieldValue(
          'employmentTypeIds',
          checkedEmploymentTypes.map((el) => el.id),
        );

      case 'dateAvailableFrom':
        return setFieldValue('dateAvailableFrom', value);

      case 'dateAvailableTo':
        return setFieldValue('dateAvailableTo', value);

      case 'setHoursWorkingTime':
        return setFieldValue(`setHoursWorkingTime.${name}`, value);

      default:
        return false;
    }
  };

  const handleworkingTime = (
    value: boolean,
    index: number,
    setFieldValue: {
      (
        field: string,
        value: string | Date | boolean | workingTimeRecord[],
        shouldValidate?: boolean | undefined,
      ): void;
      (arg0: string, arg1: string[]): void;
    },
    workingTime: workingTimeRecord[],
    range: string,
  ) => {
    const upadatedworkingTime = workingTime.map((el, i) => (i === index ? { ...el, [range]: value } : el));
    setFieldValue('workingTime', upadatedworkingTime);
  };

  const navigateToMap = useCallback(() => {
    if (roles.length === 1) {
      navigation.navigate(Types.Route.AdCreateMap, {
        redirectAfterSubmit: Types.Route.AdCreate,
        userType: roles[0],
      });
    } else {
      console.log('SHOW_USER_ROLE_CHOICE_BUTTONS ');
    }
  }, [navigation, roles]);

  const renderForm = useCallback(
    (formProps: FormikProps<AdFormData>) => {
      const { handleChange, handleBlur, setFieldValue, values, handleSubmit, errors, touched } = formProps;

      return (
        <View>
          <StyledText style={styles.label}>{i18n.t('adCreate:employmentType')}</StyledText>
          <View style={[styles.row, styles.marginBottomRegular]}>
            {typeemployments.map((typeemployment) => (
              <Button
                key={typeemployment.id}
                buttonStyle={[
                  styles.typeofEmploymentButton,
                  values.employmentTypeIds.includes(typeemployment.id)
                    ? { backgroundColor: palette.primaryDefault }
                    : { backgroundColor: palette.lightGrey },
                ]}
                titleStyle={styles.buttonTitle}
                title={typeemployment.name}
                onPress={() =>
                  handleSetValue('employmentTypes', typeemployment.id, setFieldValue, typeemployment.name)
                }
              />
            ))}
            {errors.employmentTypeIds && touched.employmentTypeIds && (
              <StyledText style={styles.errorMessage}>{errors.employmentTypeIds}</StyledText>
            )}
          </View>
          <View style={styles.marginBottomRegular}>
            <StyledText style={styles.label}>{i18n.t('adCreate:availableFrom')}</StyledText>
            <DatePicker
              date={values.dateAvailableFrom}
              onDateChange={(date) => handleSetValue('dateAvailableFrom', date, setFieldValue)}
              androidVariant={Platform.OS === 'android' ? 'nativeAndroid' : undefined}
              mode="date"
            />
            {checkedEmploymentTypes.filter((el) => el.name === 'Once').length === 0 && (
              <Checkbox
                checked={values.fixedTerm}
                onPress={() => setFieldValue('fixedTerm', !values.fixedTerm)}
                label={i18n.t('adCreate:fixedTerm')}
                containerStyle={styles.checkboxContainer}
              />
            )}
          </View>
          {checkedEmploymentTypes.filter((el) => el.name === 'Once').length === 0 && values.fixedTerm && (
            <View style={styles.marginBottomRegular}>
              <StyledText style={styles.label}>{i18n.t('adCreate:availableTo')}</StyledText>
              <DatePicker
                date={values.dateAvailableTo}
                onDateChange={(date) => handleSetValue('dateAvailableTo', date, setFieldValue)}
                androidVariant={Platform.OS === 'android' ? 'nativeAndroid' : undefined}
                mode="date"
              />
            </View>
          )}
          <View style={styles.marginBottomRegular}>
            <StyledText style={styles.label}>{i18n.t('adCreate:services')}</StyledText>
            {services.map((service) => (
              <Checkbox
                key={service.id}
                checked={values.serviceIds.includes(service.id)}
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
            <StyledText style={styles.label}>{i18n.t('adCreate:setHoursWorkingTime')}</StyledText>
            <View style={styles.rowTwoButtons}>
              <View>
                <Button
                  buttonStyle={[
                    styles.buttonHalfScreen,
                    values.setHoursWorkingTime.negotiable === true
                      ? { backgroundColor: palette.primaryDefault }
                      : { backgroundColor: palette.lightGrey },
                  ]}
                  titleStyle={styles.buttonTitle}
                  title={i18n.t('adCreate:workingTimeNegotiable')}
                  onPress={() => {
                    handleSetValue(
                      'setHoursWorkingTime',
                      !values.setHoursWorkingTime.negotiable,
                      setFieldValue,
                      'negotiable',
                    );
                    handleSetValue('setHoursWorkingTime', false, setFieldValue, 'setHours');
                  }}
                />
                {errors.setHoursWorkingTime &&
                  touched.setHoursWorkingTime &&
                  values.setHoursWorkingTime.negotiable === null &&
                  values.setHoursWorkingTime.setHours === null && (
                    <StyledText style={[styles.errorMessage, styles.marginTopTiny]}>
                      Choose one option
                    </StyledText>
                  )}
              </View>
              <Button
                buttonStyle={[
                  styles.buttonHalfScreen,
                  styles.marginBottomRegular,
                  values.setHoursWorkingTime.setHours === true
                    ? { backgroundColor: palette.primaryDefault }
                    : { backgroundColor: palette.lightGrey },
                ]}
                titleStyle={styles.buttonTitle}
                title={i18n.t('adCreate:setHoursWorkingTimeSetHours')}
                onPress={() => {
                  handleSetValue(
                    'setHoursWorkingTime',
                    !values.setHoursWorkingTime.setHours,
                    setFieldValue,
                    'setHours',
                  );
                  handleSetValue('setHoursWorkingTime', false, setFieldValue, 'negotiable');
                }}
              />
            </View>
            {values.setHoursWorkingTime.setHours && (
              <TimeOfDayCheckboxes
                setFieldValue={setFieldValue}
                workingTime={values.workingTime}
                handleOnPress={handleworkingTime}
              />
            )}
          </View>
          <View style={styles.marginBottomRegular}>
            <StyledText style={styles.label}>{i18n.t('adCreate:location')}</StyledText>
            <TextInput
              containerStyle={styles.negativeMarginBottomRegular}
              disabled
              withBorder
              errorMessage={errors.address && touched.address ? errors.address : ''}
              secureTextEntry={false}
              value={address}
              autoCapitalize="none"
              onBlur={handleBlur('address')}
              blurOnSubmit
              size="small"
              autoCompleteType="off"
            />
            <Button
              buttonStyle={[
                styles.button,
                latitude !== 0 && longitude !== 0
                  ? { backgroundColor: palette.primaryDefault }
                  : { backgroundColor: palette.lightGrey },
              ]}
              titleStyle={styles.buttonTitle}
              title={i18n.t('location:detectLocation')}
              onPress={() => navigateToMap()}
            />
          </View>
          <View style={styles.marginBottomRegular}>
            <StyledText style={styles.label}>{i18n.t('adCreate:description')}</StyledText>
            <TextInput
              size="textArea"
              withBorder
              errorMessage={errors.description && touched.description ? errors.description : ''}
              secureTextEntry={false}
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              autoCapitalize="none"
              blurOnSubmit
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
              autoCompleteType="off"
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
    [loading, latitude, longitude, address],
  );

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      enableReinitialize={enableReinitialize}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
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
  rowTwoButtons: {
    flexDirection: 'row',
  },
  button: {
    marginTop: 8,
  },
  buttonTitle: {
    color: palette.grayscale09,
  },
  checkboxContainer: {
    marginBottom: -spacing.small,
  },
  label: {
    ...typography.subtitle1,
    marginBottom: spacing.tiny,
  },
  errorMessage: {
    ...typography.hints,
    color: palette.error,
  },
  buttonHalfScreen: {
    width: '75%',
  },
  marginTopTiny: {
    marginTop: spacing.tiny,
  },
  marginBottomRegular: {
    marginBottom: spacing.regular,
  },
  negativeMarginBottomRegular: {
    marginBottom: -spacing.regular,
  },
  typeofEmploymentButton: {
    marginBottom: 5,
  },
});
