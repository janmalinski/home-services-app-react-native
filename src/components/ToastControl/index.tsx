import React from 'react';
import ToastComponent from 'react-native-toast-message';

import ToastMessage from '../ToastMessage';

const toastConfig = {
  info: (props: any) => <ToastMessage {...props} />,
  error: (props: any) =>  <ToastMessage {...props} />,
  success: (props: any) =>  <ToastMessage {...props} />,
};

export class ToastControl {
  static show(message: string, type: string): void {
    if (!message) {
      return;
    }

    try {
      ToastComponent.show({
        text1: message,
        type,
        position: 'top',
        autoHide: true,
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log('TOASTCONTROL_ERROR', error);
    }
  }
}



export const Toast = () => (
  <ToastComponent config={toastConfig} topOffset={50} />
);
