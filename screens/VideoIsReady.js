import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, View, Image, TouchableOpacity, Modal, Pressable, Linking } from "react-native";
import { Color, FontSize, Border, FontFamily, Padding } from "../GlobalStyles";
import Video from 'react-native-video';
import { useNavigation } from "@react-navigation/native";
import Share from 'react-native-share';
import VideoPlayer from 'react-native-video-controls';
import crashlytics from '@react-native-firebase/crashlytics';




const VideoIsReady = ({ route }) => {
  const {fileDest} = route.params;
  console.log(fileDest)
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  crashlytics().log('Video is ready');


  const shareVideo = async () => {
    try {
      const videoPath = 'file://'+fileDest;
      const options = {
        type: 'video/mp4',
        url: videoPath,
        message:"Unleash your inner artist with VidYou: Create AI Videos! ✨   I just generated this stunning piece with a few simple words."
      };
      await Share.open(options);
    } catch (error) {
      console.error('Error sharing video:', error.message);
    }
  };
  

  const navigateToHome = () => {
    navigation.navigate('HomeScreen');
  };

  const navigateToPlayStore = () => {
    const playStoreLink = 'https://play.google.com/store/apps?hl=en&gl=US&pli=1';
    Linking.openURL(playStoreLink);
  };

  return (
    <View style={[styles.videoIsReady, styles.videoFlexBox]}>
      <ScrollView
        style={styles.titleParent}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={styles.title}>
          <Text style={[styles.generatingVideo, styles.videoTypo]}>
            Generated Video
          </Text>
        </View>
        <View style={styles.doneMarkParent}>
          <Image
            style={styles.doneMarkIcon}
            resizeMode="cover"
            source={require("../assets/done-mark.png")}
          />
          <Text style={[styles.yourAiVideo, styles.videoTypo]}>
            Your  Video is Ready!
          </Text>
        </View>
        <View style={styles.main}>
            <View style={styles.placeholder}>
              <VideoPlayer
                style={[styles.darkPlayAiVideoFullScreen, styles.videoFlexBox]}
                resizeMode= "cover"
                controls={true}
                source={{ uri: fileDest }} 
              />
            </View>
          </View>

        <View style={styles.main}>
          <Text
            style={[styles.nowYouCan, styles.nowYouCanTypo]}
          >{`Now you can make  Videos easily and 
quickly. `}</Text>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Video downloaded successfully</Text>
            {/* <Text style={styles.modalText}>Thank you</Text> */}
            <View style={styles.modalButtonsContainer}>
              {/* <Pressable
                style={[styles.button]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable> */}
              <TouchableOpacity
                style={[styles.button, styles.buttonPlayStore]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


      <View style={styles.bottom}>
        <TouchableOpacity onPress={navigateToHome} style={[styles.editInput, styles.downloadFlexBox]}>
          <Image
            style={styles.vectorIcon1}
            resizeMode="cover"
            source={require("../assets/home.png")}
          />
          <Text style={[styles.reGenerate, styles.nowYouCanTypo]}>{`Home`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.download, styles.downloadFlexBox]}>
          <Image
            style={styles.vectorIcon2}
            resizeMode="cover"
            source={require("../assets/vector2.png")}
          />
          <Text style={[styles.reGenerate, styles.nowYouCanTypo]}>{`Download`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={shareVideo} style={[styles.download, styles.downloadFlexBox]}>
          <Image
            style={styles.vectorIcon3}
            resizeMode="cover"
            source={require("../assets/vector3.png")}
          />
          <Text style={[styles.reGenerate, styles.nowYouCanTypo]}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameScrollViewContent: {
    flexDirection: "column",
    
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  videoFlexBox: {
    overflow: "hidden",
    flex: 1,

  },
  videoTypo: {
    textAlign: "center",
    color: Color.neutral10,
    fontWeight: "600",
    fontSize: FontSize.size_xl,
  },
  nowYouCanTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "center",
    color: Color.neutral10,
  },
  downloadFlexBox: {
    marginLeft: 12,
    height: 80,
    backgroundColor: Color.darkFrontInput,
    borderRadius: Border.br_5xs,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
  generatingVideo: {
    textTransform: "capitalize",
    fontFamily: FontFamily.urbanistSemiBold,
    width: 343,
  },
  title: {
    alignSelf: "center",
  },
  doneMarkIcon: {
    width: 45,
    height: 45,
  },
  yourAiVideo: {
    fontFamily: FontFamily.sourceCodeProSemiBold,
    marginTop: 32,
  },
  doneMarkParent: {
    marginTop: 65,
    alignItems: "center",
  },
  darkPlayAiVideoFullScreen: {
    width: "100%",
    height: 187,
  },
  placeholder: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  main: {
    marginTop: 65,
    alignSelf: "stretch",
  },
  nowYouCan: {
    fontFamily: FontFamily.montserratRegular,
    alignSelf: "stretch",
  },
  titleParent: {
    alignSelf: "stretch",
    flex: 1,
  },
  vectorIcon: {
    width: 15,
    height: 15,
  },
  reGenerate: {
    fontWeight: "500",
    fontFamily: FontFamily.montserratMedium,
    marginTop: 8,
  },
  regenerate: {
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: Padding.p_2xs,
    height: 80,
    backgroundColor: Color.darkFrontInput,
    borderRadius: Border.br_5xs,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
  vectorIcon1: {
    width: 17,
    height: 17,
  },
  editInput: {
    paddingHorizontal: 20,
    paddingVertical: Padding.p_4xs,
  },
  vectorIcon2: {
    width: 18,
    height: 18,
  },
  download: {
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_2xs,
  },
  vectorIcon3: {
    width: 22,
    height: 24,
  },
  bottom: {
    borderStyle: "solid",
    borderColor: "#39393c",
    borderTopWidth: 1,
    height: 148,
    paddingHorizontal: Padding.p_mini,
    paddingTop: Padding.p_2xs,
    paddingBottom: 48,
    marginTop: 30,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    overflow: "hidden",
    backgroundColor: Color.darkBg,
  },
  videoIsReady: {
    width: "100%",
    height: 812,
    paddingTop: Padding.p_16xl,
    backgroundColor: Color.darkBg,
    overflow: "hidden",
  },




  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: Color.darkBg,
    borderRadius: 35,
    height: 200,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white"
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    marginTop: 20,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonPlayStore: {
    position: "absolute",
    bottom: -30,
    left: 25,
    backgroundColor: "#6747E7",
    borderColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 120,
  },
  button: {
    position: "absolute",
    bottom: -30,
    right: 25,
    backgroundColor: "#6747E7",
    borderColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 120,
  },
});

export default VideoIsReady;
