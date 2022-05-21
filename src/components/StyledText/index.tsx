import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { fonts } from 'app/config/styles';

export type StyledTextProps = TextProps;

export const StyledText: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text {...props} style={[styles.text, style]} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.inter.regular,
  },
});
