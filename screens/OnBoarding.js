import * as React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from "@react-navigation/native";
import crashlytics from '@react-native-firebase/crashlytics';

import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const screenWidth = Dimensions.get('window').width;

const onboardData = [
  {
    title: "Instant Video Creation",
    description: "No filming required! Simply type your script, customize your video with stunning visuals, and hit generate.",
    image: require("../assets/photo.png")
  },
  {
    title: "Create Engaging Content",
    description: "Easily create content that captures attention and drives engagement with just a few clicks.",
    image: require("../assets/photo2.png")
  },
  {
    title: "Share with the World",
    description: "Publish your creations to multiple platforms instantly and effortlessly.",
    image: require("../assets/photo3.png")
  }
];

const OnBoarding = () => {
  const navigation = useNavigation();
  const carouselRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  crashlytics().log('Mounted On boarding screen');


  const renderItem = ({ item }) => (
    <View style={styles.onBoarding1}>
      <Image
        style={[styles.photoIcon, styles.iconLayout]}
        resizeMode="cover"
        source={item.image}
      />
      <View style={styles.baseRect} />
      <Image
        style={[styles.glowIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/glow.png")}
      />
      <Text style={[styles.instantVideoCreation, styles.skip1Clr]}>
        {item.title}
      </Text>
      <Text style={styles.noFilmingRequired}>
        {item.description}
      </Text>
      <View style={[styles.slider, styles.sliderFlexBox]}>
        {onboardData.map((_, i) => (
          <View
            key={i}
            style={[
              styles.view,
              i === activeIndex && styles.activeIcon
            ]}
          />
        ))}
      </View>
    </View>
  );

  const handleNext = () => {
    if (activeIndex < onboardData.length - 1) {
      carouselRef.current.snapToNext();
    } else {
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={onboardData}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <View style={[styles.horizontalSlider, styles.sliderFlexBox]}>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={[styles.skip1, styles.skip1FlexBox]}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonfullcircle, styles.skip1FlexBox]}
          activeOpacity={0.2}
          onPress={handleNext}
        >
          <Image
            style={styles.arrowRight}
            resizeMode="cover"
            source={require("../assets/arrow--right.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkBg,
  },
  skip1Clr: {
    color: Color.neutral10,
    textAlign: "center",
  },
  sliderFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    left: "50%",
    position: "absolute",
  },
  viewLayout: {
    marginLeft: 6,
    height: 4,
    width: 4,
    borderRadius: Border.br_37xl,
  },
  skip1FlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  skip1: {
    fontSize: FontSize.size_sm,
    lineHeight: 20,
    fontFamily: FontFamily.urbanistRegular,
    display: "flex",
    width: 29,
    textAlign: "center",
    color: Color.neutral10,
  },
  iconLayout: {
    maxHeight: "100%",
    position: "absolute",
  },
  photoIcon: {
    height: "80.05%",
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
  instantVideoCreation: {
    top: "64.78%",
    left: 17,
    fontSize: FontSize.size_7xl,
    lineHeight: 42,
    fontWeight: "700",
    fontFamily: FontFamily.urbanistBold,
    width: 338,
    textAlign: "center",
    position: "absolute",
  },
  noFilmingRequired: {
    width: "82.67%",
    top: "72.41%",
    left: "8.53%",
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    lineHeight: 26,
    fontWeight: "500",
    fontFamily: FontFamily.urbanistMedium,
    color: Color.colorLightslategray,
    textAlign: "center",
    position: "absolute",
  },
  activeIcon: {
    width: 8,
    height: 8,
    backgroundColor: Color.neutral10,
    borderRadius: Border.br_37xl,
  },
  view: {
    opacity: 0.3,
    backgroundColor: Color.neutral10,
    width: 8,
    height: 8,
    borderRadius: Border.br_37xl,
  },
  slider: {
    marginTop: 297,
    marginLeft: -19.5,
    top: "50%",
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
    backgroundColor: Color.neutral10,
    flexDirection: "row",
    justifyContent: "center",
  },
  horizontalSlider: {
    marginLeft: -134.5,
    bottom: 31,
    width: 269,
    justifyContent: "space-between",
  },
  onBoarding1: {
    backgroundColor: Color.darkBg,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default OnBoarding;
