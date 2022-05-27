import React from 'react';
import { ActivityIndicator } from 'react-native';

import { palette } from 'app/config/styles';

export interface LoadingIndicatorProps {
  color?: 'primary' | 'secondary';
}

export const LoadingIndicator = ({ color = 'primary' }: LoadingIndicatorProps) => {
  return <ActivityIndicator color={palette.LoadingIndicator[color]} size="large" />;
};
