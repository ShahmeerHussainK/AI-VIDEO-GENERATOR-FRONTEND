import React, { useCallback, useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  TouchableOpacity,
  Modal
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import NetInfo from '@react-native-community/netinfo';
import InternetConnection from "./internetConnection";
import crashlytics from '@react-native-firebase/crashlytics';



const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isConnected, setIsConnected] = useState(null);


  const openModal = useCallback((title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  }, []);

  useEffect(() => {
    crashlytics().log('Mounted Home Screen');
    console.log("i am here ")
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Check the initial network state
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });

    // Cleanup the subscription
    return () => {
      unsubscribe();
    };
  }, []);

  const handleRetry = () => {

    setLoading(true);
    setTimeout(() => {
      NetInfo.fetch().then(state => {
        setIsConnected(state.isConnected);
        setLoading(false);
        console.log("retried");
        navigation.navigate('SplashScreen')
      });
    }, 2000);
  };

  return (
    <View style={styles.homeScreen}>
      <ScrollView
        style={styles.frameParent}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={styles.irtiqaLogoTrans11Parent}>
          <Image
            style={styles.irtiqaLogoTrans11Icon}
            resizeMode="contain"
            source={require("../assets/irtiqalogotrans1-2.png")}
          />
          <Text
            style={[styles.pickYourFavorite, styles.textToVideo1FlexBox]}
          >{`Pick your favorite 
moments with VidYou`}</Text>
        </View>
        <View style={styles.frameGroup}>
          <View style={styles.videoParentFlexBox}>
            <TouchableOpacity
              style={styles.videoShadowBox1}
              activeOpacity={0.2}
              onPress={() => navigation.navigate("StartBlank")}
            >
              <Image
                style={styles.textToVideoImg}
                resizeMode="cover"
                source={require("../assets/text-to-video-img.png")}
              />
              <Text
                style={[styles.textToVideo1, styles.textToVideo1FlexBox]}
              >{`Text to video `}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.videoShadowBox}
              activeOpacity={0.2}
              onPress={() => navigation.navigate("StartScript")}
            >
              <Image
                style={styles.scriptToVideoImg}
                resizeMode="cover"
                source={require("../assets/script-to-video-img.png")}
              />
              <Text style={[styles.textToVideo1, styles.textToVideo1FlexBox]}>
                Script to video
              </Text>
            </TouchableOpacity>
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
  textToVideo1FlexBox: {
    textAlign: "center",
    color: Color.neutral10,
    alignSelf: "stretch",
  },
  videoParentFlexBox: {
    alignSelf: "stretch",
  },
  irtiqaLogoTrans11Icon: {
    maxHeight: "60%",
    width: 76,
    flex: 1,
  },
  pickYourFavorite: {
    fontSize: FontSize.size_lg,
    lineHeight: 25,
    fontWeight: "500",
    fontFamily: FontFamily.plusJakartaSansMedium,
    marginTop: 8,
  },
  irtiqaLogoTrans11Parent: {
    height: 158,
    alignItems: "center",
    alignSelf: "stretch",
  },
  textToVideoImg: {
    height: 20,
    width: 15,
  },
  textToVideo1: {
    fontSize: FontSize.size_base,
    lineHeight: 22,
    fontFamily: FontFamily.plusJakartaSansRegular,
    marginTop: 10,
  },
  videoShadowBox1: {
    justifyContent: "center",
    height: 116,
    borderWidth: 3,
    borderColor: Color.colorDarkslategray_200,
    borderStyle: "solid",
    borderRadius: Border.br_7xs,
    shadowOpacity: 1,
    elevation: 3.7,
    shadowRadius: 3.7,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderRadius:20,
    shadowColor: "rgba(42, 43, 43, 0.25)",
    alignItems: "center",
   
    backgroundColor: Color.darkBg,
  },
  scriptToVideoImg: {
    height: 18,
    width: 15,
  },
  videoShadowBox: {
    marginTop:"5%",
    justifyContent: "center",
    height: 116,
    borderWidth: 3,
    borderColor: Color.colorDarkslategray_200,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 3.7,
    shadowRadius: 3.7,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderRadius:20,
    shadowColor: "rgba(42, 43, 43, 0.25)",
    alignItems: "center",
   
    backgroundColor: Color.darkBg,
  },
  speechToVideoImg: {
    width: 18,
    height: 26,
  },
  imageToVideoImg: {
    width: 20,
    height: 20,
  },
  
  videoToVideoImg: {
    width: 25,
    height: 25,
  },
  frameGroup: {
    marginTop: "20%",
    alignSelf: "stretch",
  },
  frameParent: {
    alignSelf: "stretch",
    flex: 1,
  },
  homeScreen: {
    width: "100%",
    height: 812,
    paddingTop: 79,
    overflow: "hidden",
    backgroundColor: Color.darkBg,
    flex: 1,
  },

  modal: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: 400,
    backgroundColor: Color.darkBg,
    borderRadius: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    fontFamily: FontFamily.montserratMedium,
    textAlign: "center"
  },
  modalMessage: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
    fontWeight: "regular",
    fontFamily: FontFamily.montserratMedium,
  },
  okButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#6747E7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 100,
  },
  okButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center"
  },
});

export default HomeScreen;
