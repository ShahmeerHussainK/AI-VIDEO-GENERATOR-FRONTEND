import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding } from "../GlobalStyles";
import RNFS from 'react-native-fs';
import axios from "axios";
import CircularProgress from "react-native-circular-progress-indicator";
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

const generateRandomString = () => Math.random().toString(36).substring(7);
const generateUniqueFileName = () => `${new Date().getTime()}_${generateRandomString()}`;

const downloadVideo = async (videoUrl, index, updateProgress) => {
  const fileName = generateUniqueFileName() + `video_${index}.mp4`;
  const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;

  try {
    const res = await new Promise((resolve, reject) => {
      const download = RNFS.downloadFile({
        fromUrl: videoUrl,
        toFile: downloadDest,
        progress: (res) => {
          const progress = (res.bytesWritten / res.contentLength);
          updateProgress(progress);
        },
        progressDivider: 1,
      });

      download.promise.then((response) => {
        if (response.statusCode === 200) {
          resolve(downloadDest);
        } else {
          reject(`Failed to download ${videoUrl} ${response.statusCode}`);
        }
      }).catch((error) => {
        reject(`Error downloading ${videoUrl}: ${error}`);
      });
    });
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const downloadVideos = async (videoUrls, setProgress) => {
  const downloadedVideoPaths = [];
  const totalVideos = videoUrls.length;

  for (let i = 0; i < totalVideos; i++) {
    const videoUrl = videoUrls[i];
    const downloadedPath = await downloadVideo(videoUrl, i, (videoProgress) => {
      setProgress(((i + videoProgress) / totalVideos) * 100);
    });
    if (downloadedPath) {
      downloadedVideoPaths.push(downloadedPath);
    }
  }

  return downloadedVideoPaths;
};

const ProcessingVideo = ({ route }) => {
  const navigation = useNavigation();
  const [analyzingDone, setAnalyzingDone] = useState(false);
  const [thinkingDone, setThinkingDone] = useState(false);
  const [generatingVideoDone, setGeneratingVideoDone] = useState(false);
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const { urls, generatedScript, dialectValue, languageValue } = route.params;

  useEffect(() => {

    analytics().logEvent('button_click', {
      button_name: 'Processing Video',
      });
       analytics().logScreenView({
        screen_name: "ProcessingVideo",
        screen_class: "ProcessingVideo",
      });
      crashlytics().log('getting title , downloading videos');

    axios.get('https://irtiqa-ai-api.azurewebsites.net/title', {
      params: { text: generatedScript },
      headers: { 'Accept': 'application/json' },
    }).then(response => {
      setTitle(response.data);
      console.log(title);
    }).catch(error => {
      console.error('There was a problem with the axios operation:', error);
    });

    const analyzingDoneTimer = setTimeout(() => setAnalyzingDone(true), 5000);

    console.log(urls);
    downloadVideos(urls, setProgress)
      .then((downloadedPaths) => {
        console.log('Downloaded video paths:', downloadedPaths);
        navigation.navigate("GeneratingVideo", { downloadedPaths, generatedScript, dialectValue, languageValue });
      })
      .catch((error) => console.error('Error downloading videos:', error));

    return () => clearTimeout(analyzingDoneTimer);
  }, []);

  useEffect(() => {
    if (analyzingDone) {
      setTimeout(() => {
        setThinkingDone(true);
        setGeneratingVideoDone(true);
        setTimeout(() => {}, 5500);
      }, 0);
    }
  }, [analyzingDone, navigation]);

  return (
    <View style={[styles.processingVideo, styles.imageIconLayout]}>
      <ScrollView
        style={styles.titleParent}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={styles.title}>
          <Text style={styles.processingVideo1}>Processing Video</Text>
        </View>
        <Image
          style={[styles.imageIcon, styles.imageIconLayout]}
          resizeMode="cover"
          source={require("../assets/image.png")}
        />
        <View style={styles.videoProcessing}>
          <Text style={[styles.videoTitleCreatedContainer, styles.analyzingDoneTypo]}>
            <Text style={styles.videoTitleCreated}>{`Video Title : `}</Text>
            <Text style={styles.egBusinessPresentation}>{title}</Text>
          </Text>
          <View style={[styles.analyzingVideo, styles.adsContainerFlexBox]}>
            <Image
              style={styles.doneIcon}
              resizeMode="cover"
              source={require("../assets/done.png")}
            />
            <Text style={[styles.analyzingDone, styles.analyzingDoneTypo]}>
              {analyzingDone ? "Analyzing done" : "Analyzing..."}
            </Text>
          </View>
          {thinkingDone && (
            <View style={[styles.analyzingVideo, styles.adsContainerFlexBox]}>
              <Image
                style={styles.doneIcon}
                resizeMode="cover"
                source={require("../assets/done.png")}
              />
              <Text style={[styles.analyzingDone, styles.analyzingDoneTypo]}>
                {thinkingDone ? "Thinking done" : "Thinking..."}
              </Text>
            </View>
          )}
          {generatingVideoDone && (
            <View style={[styles.analyzingVideo, styles.adsContainerFlexBox]}>
              <Image
                style={styles.doneIcon}
                resizeMode="cover"
                source={require("../assets/iconsarrowsreloadcircle.png")}
              />
              <Text style={[styles.analyzingDone, styles.analyzingDoneTypo]}>
                Generating Video...
              </Text>
            </View>
          )}
        </View>
        <View style={styles.progressContainer}>
        <CircularProgress
            value={progress.toFixed(2)}
            radius={100}
            maxValue={100}
            duration={9000}
            progressValueColor="#ffffff"
            textColor={Color.neutral10}
            activeStrokeColor="#0096FF"
            inActiveStrokeColor={Color.darkBg}
            textStyle={styles.progressText}
          />
            {
              (fill) => (
                <Text style={styles.progressText}>
                  {Math.round(progress)}%
                </Text>
              )
            }
          {/* </AnimatedCircularProgress> */}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  progressContainer: {
    marginTop: "30%",
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  progressText: {
    fontSize: FontSize.size_xl,
    color: Color.neutral10,
    fontWeight: "600",
  },  
  frameScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 0,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  imageIconLayout: {
    width: "100%",
    overflow: "hidden",
  },
  analyzingDoneTypo: {
    textAlign: "left",
    fontFamily: FontFamily.manropeSemiBold,
    lineHeight: 15,
    fontSize: FontSize.size_3xs,
    fontWeight: "600",
  },
  adsContainerFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  processingVideo1: {
    fontSize: FontSize.size_xl,
    textTransform: "capitalize",
    fontFamily: FontFamily.urbanistSemiBold,
    width: 343,
    textAlign: "center",
    color: Color.neutral10,
    fontWeight: "600",
  },
  title: {
    alignSelf: "center",
  },
  imageIcon: {
    borderRadius: 10,
    maxWidth: "100%",
    height: 210,
    marginTop: 30,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  videoTitleCreated: {
    color: Color.neutral10,
  },
  egBusinessPresentation: {
    color: "#909090",
  },
  videoTitleCreatedContainer: {
    alignSelf: "stretch",
  },
  doneIcon: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  analyzingDone: {
    marginLeft: 15,
    color: Color.neutral10,
  },
  analyzingVideo: {
    marginTop: 7,
    alignSelf: "stretch",
  },
  videoProcessing: {
    marginTop: 30,
    width: 343,
  },
  ads1: {
    fontSize: FontSize.size_19xl_1,
    fontWeight: "500",
    fontFamily: FontFamily.rubikMedium,
    color: Color.colorDarkgray,
    textAlign: "center",
  },
  adsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 13,
    backgroundColor: Color.darkFrontInput,
    width: 335,
    justifyContent: "center",
    paddingHorizontal: Padding.p_117xl,
    paddingVertical: Padding.p_92xl,
    height: 267,
    overflow: "hidden",
  },
  ads: {
    alignSelf: "stretch",
    flex: 1,
  },
  adsWrapper: {
    flexDirection: "row",
    alignSelf: "stretch",
    flex: 1,
  },
  ad: {
    height: 267,
    marginTop: 30,
    alignSelf: "stretch",
  },
  titleParent: {
    alignSelf: "stretch",
    flex: 1,
  },
  processingVideo: {
    backgroundColor: Color.darkBg,
    height: 812,
    paddingTop: Padding.p_16xl,
    overflow: "hidden",
    flex: 1,
  },
});

export default ProcessingVideo;
