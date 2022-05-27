/*
 * Try to always use following typography in your components.
 * This style is based on default Material Design typography.
 * https://material.io/design/typography/the-type-system.html#type-scale
 * */
import { StyleSheet } from 'react-native';

import { fonts } from './fonts';

export const typography = StyleSheet.create({
  header1: {
    fontFamily: fonts.montserrat.bold,
    fontSize: 34,
    lineHeight: 32,
  },
  header2: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: 24,
    lineHeight: 28,
  },
  subtitle1: {
    fontFamily: fonts.inter.semiBold,
    fontSize: 16,
    lineHeight: 22,
  },
  subtitle2: {
    fontFamily: fonts.inter.medium,
    fontSize: 14,
    lineHeight: 20,
  },
  body1: {
    fontFamily: fonts.inter.regular,
    fontSize: 16,
    lineHeight: 22,
  },
  body2: {
    fontFamily: fonts.inter.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    fontFamily: fonts.inter.medium,
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontFamily: fonts.inter.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  overline: {
    fontFamily: fonts.inter.regular,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  hints: {
    fontFamily: fonts.inter.regular,
    fontSize: 10,
    lineHeight: 14,
  },
});
