import { Image, StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, StyledText } from 'app/components';
import * as Types from 'app/types';
import { typography, palette } from 'app/config/styles';


type Props = Types.RootStackScreenProps<Types.Route.Welcome>;

export const WelcomeScreen = ({ navigation }: Props) => {
    const navigateSignInScreen = useCallback(() => {
        navigation.navigate(Types.Route.SignIn);
      }, []);

    const navigateToLocationScreen = useCallback(() => {
    navigation.navigate(Types.Route.Location);
    }, []);
    
    const Header = (
      <View style={styles.header}>
      <SafeAreaView style={styles.headerInner} edges={['top']}>
        <Image source={require('app/assets/bootsplash_logo.png')} style={styles.brand} />
        <StyledText style={styles.headerText}>Hire Home Help</StyledText>
      </SafeAreaView>
    </View>
    )

  return (
      <ImageBackground
        source={{
          uri: 'https://media.istockphoto.com/photos/nothing-is-better-than-team-work-picture-id590277932?s=612x612',
        }}
        resizeMode="cover"
        style={styles.imageBackground}
      >
      <View style={styles.container}>
        {Header}
        <StyledText style={styles.title}>Find home help in 10 minutes</StyledText>
        <View style={styles.subContainer}>
          <Button
            style={styles.button}
            title="Start"
            onPress={navigateToLocationScreen}
          />
          <TouchableOpacity style={styles.row} onPress={navigateSignInScreen}>
            <StyledText style={styles.paragraph}>Already have an account?</StyledText>
            <View style={styles.link}>
              <StyledText style={styles.paragraph}>Log In</StyledText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    imageBackground: { width: '100%', height: '100%' },
    header: {
      flex: 1,
    },
    headerText: {
      ...typography.header1,
      color: palette.grayscale00,
    },
    headerInner: {
      paddingTop: 20,
      alignItems: 'center',
    },
    brand: {
      width: 156,
      height: 30,
      resizeMode: 'contain',
      marginBottom: 16,
    },
    title: {
      ...typography.header2,
      color: palette.grayscale00,
      textAlign: 'center',
    },
    paragraph: {
      ...typography.subtitle1,
      lineHeight: 16,
      color: palette.grayscale00,
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    subContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      marginTop: 30,
    },
    link: {
      marginLeft: 3,
      borderBottomColor: palette.grayscale00,
      borderBottomWidth: 1,
    },
    button: {
      marginTop: 100,
    },
})