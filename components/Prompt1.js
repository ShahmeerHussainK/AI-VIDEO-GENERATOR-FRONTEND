import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from "react-native";
import {
  Border,
  Color,
  FontFamily,
  FontSize,
  StyleVariable,
} from "../GlobalStyles";

const Prompt1 = ({ rectangle6021, createAVideoOfAVirtualTra }) => {
  return (
    <View style={styles.prompt1}>
      <Image
        style={styles.prompt1Child}
        resizeMode="cover"
        source={rectangle6021}
      />
      <Text style={[styles.createAVideo, styles.tryFlexBox]}>
        {createAVideoOfAVirtualTra}
      </Text>
      <View style={[styles.try, styles.tryFlexBox]}>
        <Text style={[styles.try1, styles.tryFlexBox]}>TRY</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tryFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  prompt1Child: {
    borderRadius: Border.br_3xs,
    height: 133,
    zIndex: 0,
    width: 158,
  },
  createAVideo: {
    textTransform: "capitalize",
    color: Color.neutral10,
    zIndex: 1,
    marginTop: 4,
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.urbanistRegular,
    fontSize: FontSize.size_xs,
    alignItems: "center",
    width: 158,
  },
  try1: {
    letterSpacing: 0,
    lineHeight: 19,
    color: Color.colorGray_100,
    width: 25,
    height: 18,
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.urbanistRegular,
    fontSize: FontSize.size_xs,
    alignItems: "center",
  },
  try: {
    position: "absolute",
    marginLeft: 27,
    top: 105,
    left: "50%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: StyleVariable.cornerRadiusRadiusButton12,
    backgroundColor: Color.colorWhitesmoke,
    width: 41,
    height: 20,
    zIndex: 2,
  },
  prompt1: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

export default Prompt1;
