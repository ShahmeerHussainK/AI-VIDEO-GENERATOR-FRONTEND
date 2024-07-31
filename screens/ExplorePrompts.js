import * as React from "react";
import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding, Border } from "../GlobalStyles";

const ExplorePrompts = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.explorePrompts, styles.iconLayout]}>
      <View style={[styles.topBar, styles.parentFlexBox]}>
        <Pressable
          style={styles.backButton2}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/back-button3.png")}
          />
        </Pressable>
        <Text style={styles.explorePrompt}>Explore Prompt</Text>
      </View>
      <ScrollView
        style={styles.explorePromptsWrapper}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={styles.explorePrompts1}>
          <View style={styles.parentFlexBox}>
            <ImageBackground
              style={[styles.podcastsIcon, styles.iconFlexBox]}
              resizeMode="cover"
              source={require("../assets/podcasts.png")}
            >
              <Text style={[styles.try, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
            <ImageBackground
              style={[styles.newReleasesIcon, styles.iconFlexBox]}
              resizeMode="cover"
              source={require("../assets/newreleases.png")}
            >
              <Text style={[styles.try1, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
          </View>
          <View style={[styles.chartsParent, styles.parentFlexBox]}>
            <ImageBackground
              style={[styles.podcastsIcon, styles.iconFlexBox]}
              resizeMode="cover"
              source={require("../assets/charts.png")}
            >
              <Text style={[styles.try2, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
            <ImageBackground
              style={[styles.newReleasesIcon, styles.iconFlexBox]}
              resizeMode="cover"
              source={require("../assets/concerts.png")}
            >
              <Text style={[styles.try3, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
          </View>
          <View style={[styles.chartsParent, styles.parentFlexBox]}>
            <ImageBackground
              style={[styles.podcastsIcon, styles.iconFlexBox]}
              resizeMode="cover"
              source={require("../assets/madeforyou.png")}
            >
              <Text style={[styles.try4, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
            <ImageBackground
              style={[styles.newReleasesIcon, styles.iconFlexBox]}
              resizeMode="cover"
              source={require("../assets/athome.png")}
            >
              <Text style={[styles.try5, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
          </View>
          <View style={[styles.chartsParent, styles.parentFlexBox]}>
            <ImageBackground
              style={[styles.podcastsIcon, styles.iconFlexBox]}
              resizeMode="cover"
              source={require("../assets/madeforyou1.png")}
            >
              <Text style={[styles.try6, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
            <ImageBackground
              style={[styles.newReleasesIcon, styles.iconFlexBox]}
              resizeMode="cover"
              source={require("../assets/athome1.png")}
            >
              <Text style={[styles.try7, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
          </View>
          <View style={[styles.chartsParent, styles.parentFlexBox]}>
            <ImageBackground
              style={[styles.podcastsIcon, styles.iconFlexBox]}
              resizeMode="cover"
              source={require("../assets/madeforyou2.png")}
            >
              <Text style={[styles.try8, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
            <ImageBackground
              style={[styles.newReleasesIcon, styles.iconFlexBox]}
              resizeMode="cover"
              source={require("../assets/athome2.png")}
            >
              <Text style={[styles.try9, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  frameScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingVertical: 0,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },
  parentFlexBox: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  iconFlexBox: {
    height: 116,
    flexDirection: "row",
    flex: 1,
  },
  tryTypo: {
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowColor: "#000",
    fontFamily: FontFamily.poppinsBold,
    letterSpacing: -0.6,
    fontSize: FontSize.size_base,
    color: Color.neutral10,
    fontWeight: "700",
  },
  icon: {
    height: "100%",
  },
  backButton2: {
    width: 25,
    height: 25,
  },
  explorePrompt: {
    fontSize: 24,
    lineHeight: 38,
    textTransform: "capitalize",
    fontFamily: FontFamily.urbanistBold,
    width: 209,
    marginLeft: 60,
    textAlign: "left",
    color: Color.neutral10,
    fontWeight: "700",
  },
  topBar: {
    alignItems: "center",
    paddingHorizontal: Padding.p_mini,
    paddingVertical: 0,
  },
  try: {
    textAlign: "center",
    width: 36,
    height: 21,
  },
  podcastsIcon: {
    borderRadius: Border.br_7xs,
    paddingHorizontal: Padding.p_4xs,
    paddingVertical: Padding.p_mid,
  },
  try1: {
    textAlign: "left",
  },
  newReleasesIcon: {
    borderRadius: Border.br_9xs,
    paddingHorizontal: Padding.p_6xs,
    paddingVertical: Padding.p_2xl,
    marginLeft: 18,
  },
  try2: {
    textAlign: "left",
  },
  try3: {
    textAlign: "left",
  },
  chartsParent: {
    marginTop: 23,
  },
  try4: {
    textAlign: "left",
  },
  try5: {
    textAlign: "left",
  },
  try6: {
    textAlign: "left",
  },
  try7: {
    textAlign: "left",
  },
  try8: {
    textAlign: "left",
  },
  try9: {
    textAlign: "left",
  },
  explorePrompts1: {
    alignSelf: "stretch",
  },
  explorePromptsWrapper: {
    marginTop: 30,
    alignSelf: "stretch",
    flex: 1,
  },
  explorePrompts: {
    backgroundColor: Color.darkBg,
    height: 812,
    paddingTop: Padding.p_16xl,
    flex: 1,
  },
});

export default ExplorePrompts;
