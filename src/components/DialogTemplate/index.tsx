import React from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import { palette, typography } from 'app/config/styles';

import { Button } from '../Button';
import { Icon, IconProps } from '../Icon';

export interface DialogTemplateProps {
  title: string;
  description: string;
  iconProps?: IconProps;
  proceedButtonLabel?: string;
  cancelButtonLabel?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onProceed?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  onBackdropPress?: () => void;
}

export const DialogTemplate: React.FC<DialogTemplateProps> = ({
  title,
  description,
  iconProps,
  proceedButtonLabel,
  cancelButtonLabel,
  containerStyle,
  onProceed,
  onCancel,
  onClose,
  onBackdropPress,
}) => {
  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <TouchableWithoutFeedback onPress={onBackdropPress}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <View style={styles.dialog}>
        {onClose && (
          <View style={styles.wrapIconClose}>
            <Icon name="close" color={palette.text} onPress={onClose} />
          </View>
        )}
        <View style={styles.content}>
          {iconProps && (
            <View style={styles.wrapIcon}>
              <Icon type="material-community" size={70} color={palette.primaryDefault} {...iconProps} />
            </View>
          )}
          {title && <Text style={styles.title}>{title}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        <View style={styles.buttons}>
          {cancelButtonLabel && onCancel && (
            <View style={styles.wrapButton}>
              <Button title={cancelButtonLabel} onPress={onCancel} type="outline" />
            </View>
          )}
          {proceedButtonLabel && onProceed && (
            <View style={styles.wrapButton}>
              <Button title={proceedButtonLabel} onPress={onProceed} />
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  dialog: {
    width: '100%',
    backgroundColor: palette.grayscale00,
    borderRadius: 7,
  },
  wrapIconClose: {
    paddingTop: 24,
    paddingRight: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 32,
  },
  wrapIcon: {
    marginBottom: 32,
  },
  title: {
    ...typography.subtitle1,
    color: palette.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    ...typography.subtitle2,
    color: palette.text,
    marginBottom: 14,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  wrapButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});
