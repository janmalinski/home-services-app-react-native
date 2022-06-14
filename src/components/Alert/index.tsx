import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';

import { selectors, actions } from 'app/store';
import { palette } from "app/config/styles";

const DISMISS_INTERVAL = 4000;

export const Alert = () => {

  const windowHeight = Dimensions.get("window").height;
  const popAnim = useRef(new Animated.Value(windowHeight * -1)).current;
  
  const dispatch = useDispatch();
  const message = useSelector(selectors.getAlertMessage);
  const status =  useSelector(selectors.getAlertStatus);
  
useEffect(()=>{
  if(message !== '' && status !== ''){
    popIn();
  }
},[message, status])
  

  const popIn = () => {
    Animated.timing(popAnim, {
        toValue: windowHeight * 0.8 * -1,
        duration: 300,
        useNativeDriver: true
    }).start(popOut() as any);
  }

  const popOut = () => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: windowHeight * -1,
        duration: DISMISS_INTERVAL,
        useNativeDriver: true,
      }).start(removeAlert);
  
    }, DISMISS_INTERVAL);
  };

  const removeAlert = () => dispatch(actions.removeAlert());


  return (
    <Animated.View
    style={[
      styles.toastContainer,
      {backgroundColor: palette[status]},
      {
        transform: [{ translateY: popAnim }],
      },
    ]}
  >
    <View style={styles.toastRow}>
      <View style={styles.toastText}>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            { message }
        </Text>
      </View>
    </View>
</Animated.View>

  )
}

const styles = StyleSheet.create({
    toastContainer: {
      height: 60,
      width: 350,
      // backgroundColor: "#f5f5f5",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    toastRow: {
      width: "90%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    toastText: {
      width: "70%",
      padding: 2,
    },
  });