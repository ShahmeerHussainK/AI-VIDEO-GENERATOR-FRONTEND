import React, { useEffect, useRef } from "react";
import { Image, StyleSheet, View, Animated, Easing } from "react-native";
import { Color } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import crashlytics from '@react-native-firebase/crashlytics';


const SplashScreen = () => {
  const navigation = useNavigation();

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
  crashlytics().log('Splash screen Mounted.');

    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      // Navigate to the target screen after the animation completes
      navigation.navigate('HomeScreen');
    });
  }, []);

  return (
    <View style={[styles.splashScreen, styles.splashScreenFlexBox]}>
      <View style={styles.splashScreenFlexBox}>
        <Image
          style={styles.irtiqaLogoTrans12Icon}
          resizeMode="contain"
          source={require("../assets/irtiqalogotrans1-1.png")}
        />
      </View>
      <View style={styles.progressbarContainer}>
        <Animated.View
          style={[
            styles.progressbar,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreenFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  irtiqaLogoTrans12Icon: {
    width: 194,
    height: 199,
  },
  splashScreen: {
    backgroundColor: Color.darkBg,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  progressbarContainer: {
    position: "absolute",
    bottom: 20,
    width: "70%",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  progressbar: {
    height: "100%",
    backgroundColor: "#457eff",
  },
});

export default SplashScreen;
