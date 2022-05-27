import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ViewStyle, StyleProp } from 'react-native';

export interface KeyboardAvoidingComponentProps {
  children?: React.ReactNode;
  bounces?: boolean;
  extraScrollHeight?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
}

export const KeyboardAvoidingComponent: React.FC<KeyboardAvoidingComponentProps> = ({
  children,
  extraScrollHeight,
  ...props
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={extraScrollHeight}
    >
      <ScrollView {...props}>{children}</ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
