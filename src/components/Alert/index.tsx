import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Animated,
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { selectors, actions } from 'app/store';
import { palette, spacing } from "app/config/styles";

const DISMISS_INTERVAL = 4000;

export const Alert = () => {

  const animatedValue = useRef(new Animated.Value(0)).current;
  
  const dispatch = useDispatch();
  const message = useSelector(selectors.getAlertMessage);
  const status =  useSelector(selectors.getAlertStatus);
  
useEffect(()=>{
  if(message !== '' && status !== ''){
    popIn();
  }
},[message, status])
  

  const popIn = () => {
    Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
    }).start(popOut() as any);
  }

  const popOut = () => {
    setTimeout(() => {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(removeAlert);
  
    }, DISMISS_INTERVAL);
  };

  const removeAlert = () => dispatch(actions.removeAlert());
  
  let animation = animatedValue.interpolate({
    inputRange: [0, .3, 1],
    outputRange: [-70, -10, 0]
  })

  return (
          <Animated.View
            style={[
              styles.toastContainer,
              { backgroundColor: palette[status] },
              {
                transform: [{ translateY: animation }],
              },
            ]}
          >
            <SafeAreaView edges={['top']}>
              <Text style={styles.text}>
                  { message }
              </Text>
            </SafeAreaView>
          </Animated.View>
        );
}

const styles = StyleSheet.create({
    toastContainer: {
      height: 70, 
      position: 'absolute',
      left:0, 
      top:0, 
      right:0, 
      justifyContent:  'center' 
    },
    text:{ 
      fontWeight: 'bold',
      fontSize: spacing.large,
      marginStart: spacing.large
     }
  });