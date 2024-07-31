import * as React from "react";
import { useState, useEffect } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";
import RNFS from 'react-native-fs';
import { FFmpegKit, FFmpegKitConfig } from 'ffmpeg-kit-react-native';
import Sound from 'react-native-sound';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CircularProgress from "react-native-circular-progress-indicator";
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';



async function mergeVideos(videoPaths, audioDuration, setProgress) {
  return new Promise((resolve, reject) => {
    const date = new Date();
    const fileName = generateUniqueFileName() + 'output.mp4';
    const outputFilePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    let filterComplex = '';
    let map = '';
    const perVideoDuration = audioDuration / videoPaths.length;

    for (let i = 0; i < videoPaths.length; i++) {
      filterComplex += `[${i}:v] trim=duration=${perVideoDuration},scale=1280:720,setsar=1[v${i}]; `;
      map += `[v${i}]`;
    }

    filterComplex += `${map}concat=n=${videoPaths.length}:v=1:a=0[v]`;

    const command = `-y ${videoPaths.map(path => `-i ${path}`).join(' ')} \
      -filter_complex "${filterComplex}" \
      -map "[v]" \
      -r 30 -vcodec libx264 -pix_fmt yuv420p -strict -2 ${outputFilePath}`;

    FFmpegKit.executeAsync(command, async (session) => {
      const returnCode = await session.getReturnCode();
      console.log(returnCode)
      if (returnCode) {
        resolve(outputFilePath);
      } else {
        reject(new Error('Video merge failed'));
      }
    }, (log) => {
      console.log(log.getMessage());
    }, (statistics) => {
      const progress = statistics.getTime() / (audioDuration * 1000);
      setProgress(Math.min(progress * 100, 100));
    }).catch(error => reject(error));
  });
}

const downloadSpeech = (downloadDest, text, voice = "onyx", language = "") => {
  return new Promise((resolve, reject) => {
    try {
      RNFS.downloadFile({
        fromUrl: `https://irtiqa-ai-api.azurewebsites.net/convert_text_to_speech/?text=${text}&voice=${voice}&language=${language}`,
        toFile: downloadDest,
      }).promise.then(() => {
        console.log("Audio downloaded at : ", downloadDest);
        
        const sound = new Sound(downloadDest, '', (error) => {
          if (error) {
            console.error("Error loading sound:", error);
            downloadSpeech = (downloadDest, text, voice , language)
          } else {
            const duration = sound.getDuration();
            console.log("Audio duration:", duration);
            sound.release();
            resolve(duration);
          }
        });
      }).catch(error => {
        console.error("Error downloading speech:", error);
        reject(error);
      });
    } catch (error) {
      console.error("Error downloading speech:", error);
      reject(error);
    }
  });
};

const addAudioToVideo = async (videoPath, audioPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const ffmpegCommand = `-i ${videoPath} -i ${audioPath} -c:v copy -c:a aac -strict experimental ${outputPath}`;
    FFmpegKit.execute(ffmpegCommand).then(async (session) => {
      const returnCode = await session.getReturnCode();
      if (returnCode) {
        resolve(outputPath);
      } else {
        reject(new Error('Adding audio to video failed'));
      }
    }).catch(error => reject(error));
  });
};

const generateRandomString = () => {
  return Math.random().toString(36).substring(7);
};

const generateUniqueFileName = () => {
  const timestamp = new Date().getTime();
  const randomString = generateRandomString();
  return `${timestamp}_${randomString}`;
};

const GeneratingVideo = ({ route }) => {
  const navigation = useNavigation();
  const [complete, setComplete] = useState(false);
  const { downloadedPaths } = route.params;
  const { generatedScript } = route.params;
  const { dialectValue } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { languageValue } = route.params;
  console.log("", (downloadedPaths))

  useEffect(()  => {
     analytics().logEvent('button_click', {
      button_name: 'Generating Video',
      });
       analytics().logScreenView({
        screen_name: "GenerateVideo",
        screen_class: "GenerateVideo",
      });
      crashlytics().log('Generating Video merging adding audio ');

    const fileName = generateUniqueFileName() + `audio.mp3`;
    const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    const file = generateUniqueFileName() + `video.mp4`;
    const fileDest = `${RNFS.DownloadDirectoryPath}/${file}`;
    const timeout = setTimeout(() => { }, 7500);

    downloadSpeech(downloadDest, generatedScript, dialectValue, languageValue).then((duration) => {
      mergeVideos(downloadedPaths, duration, setProgress)
        .then((videoPath) => {
          addAudioToVideo(videoPath, downloadDest, fileDest).then((videoPath) => {
            setComplete(true);
            setIsLoading(false);
            navigation.navigate("VideoIsReady", { fileDest });
          });
        });
    });

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.generatingVideo}>
      <ScrollView
        style={styles.titleParent}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={styles.title}>
          <Text style={styles.generatingVideo1}>Generating Video</Text>
        </View>

        <View style={styles.ad2SpaceBlock}>
          <Text style={[styles.statusGeneratingContainer, styles.generatingTypo]}>
            {'Status : '}
            <Text style={styles.generatingVideo2}>Generating Video</Text>
          </Text>
          <View style={styles.analyzingVideo}>
            <Text style={[styles.generatingVideoMay, styles.generatingTypo]}>
              {`Generating video may take a few seconds.
          Please don’t quit the app.`}
            </Text>
          </View>
        </View>

        {isLoading && (
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
            <Text style={styles.progressText}>Processing: {progress.toFixed(2)}%</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  frameScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  ad2SpaceBlock: {
    marginTop: 20,
    alignSelf: "stretch",
  },
  generatingTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "center",
  },
  generatingVideo1: {
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
  statusGeneratingContainer: {
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "900",
    alignSelf: "stretch",
    color: "#ffffff"
  },
  generatingVideo2: {
    color: "#ff0000",
  },
  generatingVideoMay: {
    fontFamily: FontFamily.montserratRegular,
    color: Color.neutral10,
    flex: 1,
  },
  analyzingVideo: {
    justifyContent: "space-between",
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  titleParent: {
    alignSelf: "stretch",
    flex: 1,
  },
  generatingVideo: {
    backgroundColor: Color.darkBg,
    width: "100%",
    height: 812,
    paddingTop: Padding.p_16xl,
    overflow: "hidden",
    flex: 1,
  },
  progressContainer: {
    alignSelf: "center",
    marginTop: 20,
  },
  progressText: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserratRegular,
    color: "#ffffff",
    textAlign: "center"
  },
});

export default GeneratingVideo;
