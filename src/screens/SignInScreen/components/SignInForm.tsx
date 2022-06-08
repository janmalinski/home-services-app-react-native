import { Formik, FormikProps } from 'formik';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { Button, TextInput } from 'app/components';
import { MIN_PASSWORD_LENGTH } from 'app/config/api';
import { i18n } from 'app/config/translations';

export interface SignInFormData {
  email: string;
  password: string;
}

export interface Props {
  initialValues: SignInFormData;
  loading: boolean;
  onSubmit: (values: SignInFormData) => void;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email(i18n.t('validation:email')).required(i18n.t('validation:required')),
  password: Yup.string()
    .min(MIN_PASSWORD_LENGTH, i18n.t('validation:passwordLength'))
    .required(i18n.t('validation:required')),
});

export const SignInForm: React.FC<Props> = ({ initialValues, onSubmit, loading }) => {
  const renderForm = useCallback(
    (formProps: FormikProps<SignInFormData>) => {
      const { handleChange, handleBlur, values, handleSubmit, errors, touched } = formProps;
      return (
        <View>
          <TextInput
            withBorder
            label={i18n.t('common:email')}
            errorMessage={errors.email && touched.email && errors.email}
            size="small"
            secureTextEntry={false}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            blurOnSubmit
          />
          <TextInput
            withBorder
            label={i18n.t('common:password')}
            errorMessage={errors.password && touched.password && errors.password}
            size="small"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            autoCapitalize="none"
            textContentType="password"
            blurOnSubmit
          />
          <Button
            onPress={handleSubmit}
            title={i18n.t('signIn:signInButton')}
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
