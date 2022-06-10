import { Formik, FormikProps } from 'formik';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { Button, Checkbox, TextInput } from 'app/components';
import { MIN_NAME_LENGTH, MIN_PHONE_NUMBER_LENGTH } from 'app/config/api';
import { i18n } from 'app/config/translations';

export interface AccountFormData {
  firstName: string;
  phoneNumber: string;
  consentPhoneNumberVisibility: boolean;
  email: string;
}

export interface Props {
  initialValues: AccountFormData;
  loading: boolean;
  onSubmit: (values: AccountFormData) => void;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(MIN_NAME_LENGTH, i18n.t('validation:nameLength'))
    .required(i18n.t('validation:required')),
  phoneNumber: Yup.string()
    .required(i18n.t('validation:required'))
    .matches(phoneRegExp, i18n.t('validation:phoneNumberMinLength'))
    .min(MIN_PHONE_NUMBER_LENGTH, i18n.t('validation:phoneNumberMinLength')),
  consentPhoneNumberVisibility: Yup.boolean().required(i18n.t('validation:required')),
  email: Yup.string().email(i18n.t('validation:email')).required(i18n.t('validation:required')),
});

export const AccountForm: React.FC<Props> = ({ initialValues, loading, onSubmit }) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const renderForm = useCallback(
    (formProps: FormikProps<AccountFormData>) => {
      const { handleChange, handleBlur, setFieldValue, values, handleSubmit, errors, touched } = formProps;

      return (
        <View>
          <TextInput
            withBorder
            label={i18n.t('common:name')}
            errorMessage={errors.firstName && touched.firstName ? errors.firstName : ''}
            size="small"
            secureTextEntry={false}
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            autoCapitalize="none"
            blurOnSubmit
            autoCompleteType="off"
          />
          <TextInput
            withBorder
            label={i18n.t('common:phoneNumber')}
            errorMessage={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : ''}
            size="small"
            value={values.phoneNumber}
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            autoCapitalize="none"
            blurOnSubmit
            keyboardType={'phone-pad'}
            autoCompleteType="off"
          />
          <Checkbox
            checked={values.consentPhoneNumberVisibility}
            onPress={() =>
              setFieldValue('consentPhoneNumberVisibility', !values.consentPhoneNumberVisibility)
            }
            label={i18n.t('account:consentPhoneNumberVisibility')}
          />
          <TextInput
            withBorder
            label={i18n.t('common:email')}
            errorMessage={errors.email && touched.email ? errors.email : ''}
            size="small"
            secureTextEntry={false}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            blurOnSubmit
            autoCompleteType="off"
          />
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
  button: {
    marginTop: 8,
    marginBottom: 20,
  },
});
