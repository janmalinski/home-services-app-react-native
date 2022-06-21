import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette, spacing } from 'app/config/styles';

import { KeyboardAvoidingComponent } from '../KeyboardAvoidingComponent';
import { LoadingIndicator } from '../LoadingIndicator';

export interface FullScreenTemplateProps {
  children?: React.ReactNode;
  padded?: boolean;
  safeArea?: boolean;
  bottomNavigationPad?: boolean;
  noScroll?: boolean;
  isLoading?: boolean;
  contentContainerStyle?: ViewStyle;
  header?: React.ReactNode;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
}

export const FullScreenTemplate: React.FC<FullScreenTemplateProps> = ({
  children,
  padded,
  safeArea,
  bottomNavigationPad,
  noScroll,
  isLoading,
  contentContainerStyle,
  header,
  keyboardShouldPersistTaps,
}) => {
  const RootView = safeArea ? SafeAreaView : View;
  const Container = noScroll ? View : KeyboardAvoidingComponent;

  return (
    <RootView style={styles.mainContainer} edges={['top']}>
      {header}
      <Container
        bounces={false}
        extraScrollHeight={Platform.select({ ios: 32, android: 0 })}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        contentContainerStyle={[
          styles.contentContainer,
          padded && styles.padded,
          bottomNavigationPad && styles.bottomNavigationPad,
          contentContainerStyle,
        ]}
        style={[
          styles.container,
          noScroll && styles.containerNoScroll,
          noScroll && padded && styles.padded,
          noScroll && bottomNavigationPad && styles.bottomNavigationPad,
          noScroll && contentContainerStyle,
        ]}
      >
        {isLoading && (
          <View style={styles.loadingContainer}>
            <LoadingIndicator />
          </View>
        )}
        {!isLoading && children}
      </Container>
    </RootView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: palette.backgroundLight,
    flex: 1,
  },
  container: {
    backgroundColor: palette.backgroundLight,
  },
  containerNoScroll: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  padded: {
    padding: spacing.large,
  },
  bottomNavigationPad: {
    paddingBottom: 0,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
