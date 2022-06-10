import { Formik, FormikProps } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { Button, TextInput } from 'app/components';
import { i18n } from 'app/config/translations';

export interface ResetPasswordFormData {
  email: string;
}

export interface Props {
  initialValues: ResetPasswordFormData;
  loading: boolean;
  onSubmit: (values: ResetPasswordFormData) => void;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email(i18n.t('validation:email')).required(i18n.t('validation:required')),
});

export const ResetPasswordForm: React.FC<Props> = ({ initialValues, loading, onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {(props: FormikProps<ResetPasswordFormData>) => {
        const { handleChange, handleBlur, values, handleSubmit, errors, touched, isValid } = props;
        return (
          <View style={styles.container}>
            <TextInput
              withBorder
              label={i18n.t('common:email')}
              errorMessage={errors.email && touched.email ? errors.email : ''}
              size="small"
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
              title={i18n.t('resetPassword:resetPasswordButtonLabel')}
              containerStyle={styles.button}
              loading={loading}
              disabled={values.email === '' || !isValid}
            />
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  button: {
    marginTop: 8,
  },
});
