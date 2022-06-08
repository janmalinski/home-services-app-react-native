import { Formik, FormikProps } from 'formik';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';

import { Button, Checkbox, TextInput, StyledText } from 'app/components';
import { palette } from 'app/config/styles';
import { i18n } from 'app/config/translations';
import * as Types from 'app/types';

export interface SignUpFormData extends Types.SignUpPayload{}

export interface Props {
  initialValues: SignUpFormData;
  loading?: boolean;
  onSubmit: (values: SignUpFormData) => void;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email(i18n.t('validation:email')).required(i18n.t('validation:required')),
  password: Yup.string().min(6, i18n.t('validation:passwordLength')).required(i18n.t('validation:required')),
  termsAccepted: Yup.boolean().oneOf([true], i18n.t('validation:acceptRequired')),
});

export const SignUpForm: React.FC<Props> = ({ initialValues, loading, onSubmit }) => {
  const navigateToTermsOfUse = useCallback(() => {
    // navigate to terms of use
  }, []);

  const renderForm = useCallback(
    (props: FormikProps<SignUpFormData>) => {
      const { handleChange, handleBlur, values, handleSubmit, errors, setFieldValue, touched } = props;

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
          <Checkbox
            checked={values.termsAccepted}
            onPress={() => setFieldValue('termsAccepted', !values.termsAccepted)}
            label={
              <Text>
                {i18n.t('signUp:accept')}
                <Text onPress={navigateToTermsOfUse}>
                  <StyledText style={errors.termsAccepted ? palette.error : styles.link}>
                    {i18n.t('signUp:termsOfUse')}
                  </StyledText>
                </Text>
              </Text>
            }
            errorMessage={errors.termsAccepted && touched.termsAccepted && errors.termsAccepted}
          />
          <Button
            onPress={handleSubmit}
            title={i18n.t('signUp:signUpButton')}
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
