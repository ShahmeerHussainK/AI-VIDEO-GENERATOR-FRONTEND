import * as React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const OnBoarding3 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.onBoarding4}>
      <Image
        style={[styles.photoIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/photo3.png")}
      />
      <View style={styles.baseRect} />
      <Image
        style={[styles.glowIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/glow.png")}
      />
      <Text style={[styles.goGlobal, styles.goGlobalFlexBox]}>Go Global</Text>
      <Text style={[styles.breakLanguageBarriers, styles.goGlobalFlexBox]}>
        Break language barriers! Generate videos in virtually any language,
        perfect for a worldwide audience.
      </Text>
      <View style={[styles.horizontalSlider, styles.sliderFlexBox]}>
        <Pressable onPress={() => navigation.navigate("HomeScreen")}>
          <Text style={styles.skip1}>Skip</Text>
        </Pressable>
        <TouchableOpacity
          style={styles.buttonfullcircle}
          activeOpacity={0.2}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Image
            style={styles.arrowRight}
            resizeMode="cover"
            source={require("../assets/arrow--right.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.slider, styles.sliderFlexBox]}>
        <View style={styles.viewLayout} />
        <View style={styles.view1} />
        <View style={[styles.view2, styles.viewLayout]} />
        <Image
          style={styles.activeIcon}
          resizeMode="cover"
          source={require("../assets/active2.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  goGlobalFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  sliderFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    left: "50%",
    position: "absolute",
  },
  viewLayout: {
    opacity: 0.3,
    height: 4,
    width: 4,
    borderRadius: Border.br_37xl,
    backgroundColor: Color.neutral10,
  },
  iconLayout: {
    maxHeight: "100%",
    position: "absolute",
  },
  photoIcon: {
    height: "81.05%",
    top: "10.47%",
    bottom: "8.49%",
    width: screenWidth * 0.8,
    maxHeight: "100%",
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  baseRect: {
    height: "39.78%",
    top: "60.22%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: Color.darkFrontInput,
    borderStyle: "solid",
    borderColor: Color.colorGray_100,
    borderTopWidth: 1,
    position: "absolute",
    width: "100%",
  },
  glowIcon: {
    height: "69.95%",
    width: "100.13%",
    top: "58.87%",
    right: "0.13%",
    bottom: "-28.82%",
    left: "-0.27%",
    maxWidth: "100%",
    opacity: 0.8,
    overflow: "hidden",
  },
  goGlobal: {
    top: "64.78%",
    left: 17,
    fontSize: FontSize.size_7xl,
    lineHeight: 42,
    fontWeight: "700",
    fontFamily: FontFamily.urbanistBold,
    width: 338,
    color: Color.neutral10,
    textAlign: "center",
  },
  breakLanguageBarriers: {
    width: "82.67%",
    top: "72.41%",
    left: "8.53%",
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    lineHeight: 26,
    fontWeight: "500",
    fontFamily: FontFamily.urbanistMedium,
    color: Color.colorLightslategray,
  },
  skip1: {
    fontSize: FontSize.size_sm,
    lineHeight: 20,
    fontFamily: FontFamily.urbanistRegular,
    display: "flex",
    width: 29,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: Color.neutral10,
  },
  arrowRight: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  buttonfullcircle: {
    borderRadius: Border.br_65xl,
    width: 62,
    height: 62,
    marginLeft: 178,
    backgroundColor: Color.neutral10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  horizontalSlider: {
    marginLeft: -134.5,
    top: 719,
    bottom: 31,
    width: 269,
  },
  view1: {
    backgroundColor: Color.colorSlategray,
    marginLeft: 6,
    height: 4,
    width: 4,
    borderRadius: Border.br_37xl,
  },
  view2: {
    marginLeft: 6,
  },
  activeIcon: {
    width: 8,
    height: 8,
    marginLeft: 6,
  },
  slider: {
    marginTop: 297,
    marginLeft: -19.5,
    top: "50%",
  },
  onBoarding4: {
    backgroundColor: Color.darkBg,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default OnBoarding3;
