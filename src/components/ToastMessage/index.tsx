import React from 'react';
import { View, StyleSheet, TextStyle, StyleProp, ViewStyle, Text } from 'react-native';

import { palette } from 'app/config/styles';

interface Props {
  text1: string;
  type: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const ToastMessage = React.memo<Props>(({ text1, type, textStyle, containerStyle }: Props) => {
  return (
    <View style={[styles.container, { backgroundColor: palette[type]} , containerStyle]}>
      <Text style={[styles.message, textStyle]}>{text1}</Text>
    </View>
  );
});

export default ToastMessage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    zIndex: 100000,
  },
  message: {
    fontSize: 14,
    lineHeight: 14,
    color: '#000',
  },
});
