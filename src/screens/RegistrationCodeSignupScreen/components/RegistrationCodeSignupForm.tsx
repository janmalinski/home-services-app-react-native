import { Formik, FormikProps } from 'formik';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { Button, TextInput } from 'app/components';
import { palette } from 'app/config/styles';
import { i18n } from 'app/config/translations';

export interface RegistrationCodeSignUpFormData {
  code: string;
}

export interface Props {
  initialValues: RegistrationCodeSignUpFormData;
  loading?: boolean;
  onSubmit: (values: RegistrationCodeSignUpFormData) => void;
}

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .min(4, i18n.t('validation:registrationCodeLength'))
    .required(i18n.t('validation:required')),
});

export const RegistrationCodeSignUpForm: React.FC<Props> = ({ initialValues, loading, onSubmit }) => {
  const renderForm = useCallback(
    (props: FormikProps<RegistrationCodeSignUpFormData>) => {
      const { handleChange, handleBlur, values, handleSubmit, errors, setFieldValue, touched } = props;

      return (
        <View>
          <TextInput
            withBorder
            label={i18n.t('registrationCodeSignUp:registrationCode')}
            errorMessage={errors.code && touched.code && errors.code}
            size="small"
            secureTextEntry={false}
            value={values.code}
            onChangeText={handleChange('code')}
            onBlur={handleBlur('code')}
            autoCapitalize="none"
            blurOnSubmit
            keyboardType='number-pad'
          />
          <Button
            onPress={handleSubmit}
            title={i18n.t('registrationCodeSignUp:registrationCodeButton')}
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
  link: {
    color: palette.primary,
  },
});
