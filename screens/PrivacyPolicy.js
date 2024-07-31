import React, { useState } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";

const { width } = Dimensions.get('window');

const PrivacyPolicy = () => {
    const navigation = useNavigation();

    const [isChecked, setIsChecked] = useState(false);

    const handlePrivacyPolicyPress = () => {
        Linking.openURL("https://irtiqaai.com/privacypolicy/");
    };

    return (
        <View style={styles.container}>
            <View style={styles.splashScreenFlexBox}>
        <Image
          style={styles.irtiqaLogoTrans12Icon}
          resizeMode="contain"
          source={require("../assets/irtiqalogotrans1-1.png")}
        />
      </View>

            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isChecked}
                    onValueChange={setIsChecked}
                    tintColors={{ true: '#0000ff', false: '#FFFFFF' }}
                />
                <Text style={styles.checkboxLabel}>
                    By clicking 'Get Started' you agree to{" "}
                    <Text style={{ textDecorationLine: 'underline' }} onPress={handlePrivacyPolicyPress}>
                        Privacy Policy
                    </Text>{" "}
                    & {" "}
                    <Text style={{ textDecorationLine: 'underline' }} onPress={handlePrivacyPolicyPress}>
                        Terms and Conditions.
                    </Text>{" "}
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <LinearGradient
                    style={[styles.generateButton, isChecked ? null : styles.disabledButton]}
                    locations={[0, 1]}
                    colors={["#6747e7", "#00fff0"]}
                    useAngle={true}
                    angle={92.42}
                >
                    <TouchableOpacity
                        style={styles.touchableopacity}
                        activeOpacity={0.2}
                        onPress={() => navigation.navigate("OnBoarding")}
                        disabled={!isChecked}
                    >
                        <Text style={styles.generateScript}>Get Started</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.darkBg,
        alignItems: "center",
        paddingTop: "40%",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 50,
    },
    splashScreenFlexBox: {
        justifyContent: "center",
        alignItems: "center",
      },
      irtiqaLogoTrans12Icon: {
        width: 300,
        height: 150,
      },
    logo: {
        width: 194,
        height: 199,
    },
    checkboxContainer: {
        marginLeft: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: width * 0.90,
    },
    checkboxLabel: {
        marginLeft: 8,
        marginRight: 11,
        color: Color.neutral8,
        color: "#ffffff",
    },
    buttonContainer: {
        paddingTop:50,
        alignItems: "center",
    },
    generateButton: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        width: width * 0.9,
        height: 50,
    },
    disabledButton: {
        backgroundColor: Color.gray,
        opacity: 0.3,
    },
    touchableopacity: {
        paddingHorizontal: Padding.p_16xl,
        paddingVertical: Padding.p_mini,
        backgroundColor: "transparent",
        justifyContent: "center",
        borderRadius: Border.br_xs,
        flexDirection: "row",
        alignItems: "center",
    },
    generateScript: {
        fontSize: FontSize.size_mid,
        fontFamily: FontFamily.sourceCodeProSemiBold,
        width: 207,
        textAlign: "center",
        color: Color.neutral10,
        fontWeight: "600",
    },
});

export default PrivacyPolicy;