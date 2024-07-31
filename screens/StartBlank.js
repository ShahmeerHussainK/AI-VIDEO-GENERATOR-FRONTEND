import React, { useState, useEffect } from "react";
import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Switch } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border, Padding } from "../GlobalStyles";
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';


const { width } = Dimensions.get('window');

const StartBlank = () => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageValue, setLanguageValue] = useState();
  const [dialectOpen, setDialectOpen] = useState(false);
  const [dialectValue, setDialectValue] = useState();
  const [toggleValue, setToggleValue] = useState(true);
  const [voice, setVoice] = useState('');
  const [prompt, setPrompt] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const navigation = useNavigation();
  const languageItems = [
    {label: 'Arabic', value: 'arabic' },
    {label: 'Bangla', value: 'bangla'},
    {label: 'Chinese', value: 'chinese'},
    {label: 'English', value: 'english' },
    {label: 'French', value: 'french'},
    {label: 'Hindi', value: 'hindi'},
    {label: 'Korean', value: 'korean'},
    {label: 'Russian', value: 'russian'},
    {label: 'Spanish', value: 'spanish' },
    {label: 'Urdu', value: 'urdu'},

  ];
  const dialectItems = [

    { label: 'Male', value: 'onyx' },
    { label: 'Female', value: 'nova' },

  ];
  const handlePress = (promptText) => {
    // Function to set prompt text
    setPrompt(promptText);
  };

  const handleGenerateScript = async() => {
    console.log(dialectValue)
    await analytics().logEvent('button_click', {
      button_name: 'Generate Script',
      });
      await analytics().logScreenView({
        screen_name: "StartBlankF",
        screen_class: "StartBlankF",
      });
      crashlytics().log('prompt entered at Start blank');

    navigation.navigate("GenerateScript", { prompt, dialectValue, languageValue });
  };

  useEffect(() => {
    if (prompt.trim().split(/\s+/).length <= 500) {
      setPrompt(prompt);
      setWordCount(prompt.trim().split(/\s+/).length-1);
    }
    
  }, [prompt]);

  return (
    <View style={[styles.startBlank, styles.startBlankLayout]}>
      <View style={styles.topBar}>
        <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
          <Image
            style={[styles.icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/back-icon.png")}
          />
        </Pressable>
        <Text style={[styles.startBlank1, styles.startBlank1Typo]}>
          Start Blank
        </Text>
        {/* <Image
          style={styles.icons}
          resizeMode="cover"
          source={require("../assets/icons.png")}
        /> */}
      </View>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollScrollViewContent}
      >
        <View style={styles.promptInput}>
          <Text style={[styles.enterPrompt, styles.startBlank1Typo]}>
            Enter Prompt
          </Text>
          <TextInput
            style={[styles.email, { textAlignVertical: "top" }]}
            placeholder="Enter your prompt"
            multiline={true}
            placeholderTextColor="rgba(126, 126, 126, 0.6)"
            onChangeText={setPrompt}
            value={prompt}
          />
          <View style={[styles.wordCountContainer, { position: 'absolute', bottom: 5, right: 5 }]}>
            <Text style={styles.wordCount}>{wordCount}/500</Text>
          </View>
        </View>
        <View style={[styles.language, styles.asSpaceBlock, { zIndex: 30, marginBottom: 30 }]}>

          <View style={[styles.languageDialect, styles.aspectSpaceBlock,]}>
            <Text style={[styles.language2, styles.dialectTypo]}>
              Language:
            </Text>
            
          </View>
          {/* <ScrollView
            style={[styles.aspectRatioSelection1, styles.aspectSpaceBlock]}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={true}
          > */}
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <View style={[styles.dialect1FlexBox]}>
              <DropDownPicker
                open={languageOpen}
                setOpen={setLanguageOpen}
                value={languageValue}
                setValue={setLanguageValue}
                placeholder="Select Language"
                items={languageItems}
                labelStyle={styles.dialectValue}
                textStyle={{ color: 'white' }}
                dropDownContainerStyle={styles.dialectdropDownContainer}
                style={{ "zIndex": 20, backgroundColor: Color.darkBg, borderColor: "#BBBBBB" }}
                placeholderStyle={{ color: "#fff" }}
                arrowIconStyle={{ tintColor: 'white' }}
              />
            </View>
            <View style={[styles.dialect1, styles.dialect1FlexBox]}>
              <DropDownPicker
                open={dialectOpen}
                setOpen={setDialectOpen}
                value={dialectValue}
                setValue={setDialectValue}
                placeholder="Select voice"
                items={dialectItems}
                labelStyle={styles.dialectValue}
                textStyle={{ color: 'white' }}
                dropDownContainerStyle={styles.dialectdropDownContainer}
                style={{ "zIndex": 20, backgroundColor: Color.darkBg, borderColor: "#BBBBBB" }}
                placeholderStyle={{ color: "#fff" }}
                arrowIconStyle={{ tintColor: 'white' }}
              />
            </View>
          </View>
          {/* </ScrollView> */}
        </View>

        <View style={[styles.tts, styles.ttsLayout, styles.asSpaceBlock1]}>
          <View style={styles.text}>
            <Text style={[styles.includeTtsAudio, styles.language1Typo]}>
              Include TTS audio
            </Text>
          </View>
          <Switch
            style={[styles.toggle, styles.ttsFlexBox]}
            value={toggleValue}
            onValueChange={setToggleValue}
            color="#6949ff"
          />
        </View>
        <View style={styles.asSpaceBlock2}>
          <ScrollView
            style={styles.explorePrompts1}
            horizontal={false}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.explorePromptsScrollViewContent}
          >
            <Text style={[styles.explorePrompts2, styles.exploreTypo]}>
              Explore Prompts
            </Text>
           
          </ScrollView>

          <View style={styles.podcastsParent}>
          <TouchableOpacity style={[ styles.iconFlexBox]} onPress={()=> handlePress ("Story of a virtual travel adventure to North.")}> 
            <ImageBackground
              style={[styles.podcastsIcon, styles.iconFlexBox]}
              resizeMode="cover"
              source={require("../assets/podcasts.png")}
            >
              <Text style={[styles.try, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={[ styles.iconFlexBox]} onPress={()=> handlePress ("Embark on a journey to distant planets and encounter alien life forms  story")}> 
            <ImageBackground
              style={[styles.newReleasesIcon, styles.iconFlexBox]}
              resizeMode="cover"
              source={require("../assets/newreleases.png")}
            >
              <Text style={[styles.try1, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.podcastsParent}>
          <TouchableOpacity style={[styles.iconFlexBox]} onPress={()=> handlePress ("Story on own cooking show and demonstrate how to make a delicious dish. ")}> 
            <ImageBackground
              style={[styles.podcastsIcon, styles.iconFlexBox]}
              resizeMode="cover"
              source={require("../assets/charts.png")}
            >
              <Text style={[styles.try2, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={[ styles.iconFlexBox]} onPress={()=> handlePress ("Deliver an inspiring speech on overcoming challenges and achieving success")}> 
            <ImageBackground
              style={[styles.newReleasesIcon, styles.iconFlexBox]}
              resizeMode="cover"
              source={require("../assets/concerts.png")}
            >
              <Text style={[styles.try3, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.podcastsParent}>
          <TouchableOpacity style={[styles.iconFlexBox]} onPress={()=> handlePress ("Explore a mythical land filled with creatures and magic story")}> 
            <ImageBackground
              style={[styles.podcastsIcon, styles.iconFlexBox]}
              resizeMode="cover"
              source={require("../assets/madeforyou.png")}
            >
              <Text style={[styles.try4, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconFlexBox]} onPress={()=> handlePress ("Compile hilarious moments of pets being silly and create a fun story")}> 
            <ImageBackground
              style={[ styles.iconFlexBox, styles.newReleasesIcon]}
              resizeMode="cover"
              source={require("../assets/athome.png")}
            >
              <Text style={[styles.try5, styles.tryTypo]}>TRY</Text>
            </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <LinearGradient
        style={[styles.generateButton, !prompt && styles.disabledButton]}
        locations={[0, 1]}
        colors={["#6747e7", "#00fff0"]}
        useAngle={true}
        angle={92.42}
      >
        <TouchableOpacity
          style={[styles.touchableopacity]}
          activeOpacity={0.2}
          onPress={handleGenerateScript}
          disabled={!prompt}
        >
          <Text style={styles.generateScript}>Generate Script</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  promptContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  wordCountContainer: {
    alignSelf: "flex-end"
  },
  wordCount: {
    color: Color.colorDarkslategray_100,
    fontFamily: FontFamily.robotoRegular,
  },
  ttsFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5, // Change the opacity when button is disabled
  },
  includeTtsAudio: {
    fontSize: FontSize.size_lg,
    lineHeight: 20,
    textAlign: "left",
    alignSelf: "stretch",
    fontWeight: "500",
  },
  language1Typo: {
    fontFamily: FontFamily.urbanistMedium,
    fontWeight: "500",
    color: Color.neutral10,
  },
  ttsLayout: {
    width: 346,
    borderRadius: Border.br_5xs,

  },
  languageValue: {
    color: "#bbb",
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  dialectValue: {
    color: "white",
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  generateButton: {
    marginTop: 17,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: width * 0.90,
    height: 50,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    marginBottom: "8%",

  },
  dialectdropDownContainer: {
    borderStyle: "solid",
    borderColor: "#BBBBBB",
    borderWidth: 1,
    zIndex: 10,
    backgroundColor: Color.darkFrontInput,
  },
  explorePromptsScrollViewContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  scrollScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingVertical: 0,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  startBlankLayout: {
    width: "100%",
    flex: 1,
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  startBlank1Typo: {
    fontFamily: FontFamily.urbanistSemiBold,
    color: Color.neutral10,
    textTransform: "capitalize",
    fontSize: width * 0.039,
  },
  asSpaceBlock: {
    marginTop: 13,
    alignSelf: "stretch",
  },
  asSpaceBlock2: {
    alignSelf: "stretch",
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: Padding.p_5xs,
    flexDirection: "column",
    zIndex: 1,
  },
  asSpaceBlock1: {
    marginTop: 2,
    alignSelf: "stretch",
  },
  text: {
    justifyContent: "center",
    flex: 1,
  },
  aspectSpaceBlock: {
    marginTop: 5,
    alignSelf: "stretch",
  },
  dialectTypo: {
    fontFamily: FontFamily.darkFrontInput,
    lineHeight: 16,
    fontSize: FontSize.size_base,
    textAlign: "left",
    color: Color.neutral10,
  },
  dialect1FlexBox: {
    maxWidth: 185,
    height: 48,
    borderRadius: Border.br_20xl,
    justifyContent: "center",
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    zIndex: 2,
  },
  exploreTypo: {
    fontFamily: FontFamily.latoBold,
    fontWeight: "700",
    color: Color.neutral10,
    textTransform: "capitalize",
    fontSize: FontSize.size_xl,
  },
  iconFlexBox: {
    flexDirection: "row",
    flex: 1,
  },


  tryTypo: {
    color:"white",
    fontWeight:"bold",
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
  },

  icon: {
    overflow: "hidden",
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  startBlank1: {
    width: "100%",
    marginLeft:"35%",
    color: Color.neutral10,
  },
  icons: {
    marginLeft: "15%",
    width: 94,
    height: 50,
  },
  topBar: {
    width: 372,
    justifyContent: "space-between",
    paddingHorizontal: Padding.p_mini,
    paddingVertical: 0,
    zIndex: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  enterPrompt: {
    textAlign: "left",
    alignSelf: "stretch",
    color: Color.neutral10,
    marginTop:30,
  },
  email: {
    backgroundColor: Color.darkFrontInput,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_base,
    fontFamily: FontFamily.robotoRegular,
    marginTop: 8,
    fontSize: FontSize.size_xs,
    borderRadius: Border.br_7xs,
    alignSelf: "stretch",
    flexDirection: "row",
    overflow: "hidden",
    flex: 1,
    color: 'white'
  },
  promptInput: {
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 24,
    elevation: 24,
    shadowOpacity: 1,
    height: 289,
    borderRadius: Border.br_xs,
    alignSelf: "stretch",
    backgroundColor: Color.darkBg,
  },
  language2: {
    flex: 1,

  },
  dialect: {
    width: 161,
    marginLeft: 104,
  },
  languageDialect: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    color: "white",
  },
  dropdownpicker: {
    Color: "#BBBBBB",
    borderWidth: 1,
    borderStyle: "solid",
    zIndex: 1,
    backgroundColor: Color.darkBg,

  },
  dialect1: {
    marginLeft: 5,
  },
  aspectRatioSelection1: {
    width: "100%",
    flex: 1,
  },
  language: {
    zIndex: 1,
  },
  toggle: {
    width: 40,
    height: 24,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  tts: {

    paddingHorizontal: 12,
    paddingVertical: Padding.p_5xs,
    left: 13,
    alignItems: "center",
    flexDirection: "row",
    zIndex: 1,
  },
  explorePrompts2: {
    width: 173,
    textAlign: "center",
  },
  arrow: {
    width: 17,
    height: 12,
  },
  explorePrompts1: {
    width: 340,
    flexWrap: "wrap",
    maxWidth: 340,
    flex: 1,
  },
  explorePrompts3: {
    width: 162,
    display: "none",
    textAlign: "left",
  },
  try: {
    width: 36,
    height: 21,
    textAlign: "center",
  },
  podcastsIcon: {
    paddingHorizontal: Padding.p_4xs,
    paddingVertical: Padding.p_mid,
    height: 116,
    width: width*0.41,

    
  },
  try1: {
    textAlign: "left",
  },
  newReleasesIcon: {
    borderRadius: Border.br_7xs,
    paddingHorizontal: Padding.p_6xs,
    paddingVertical: Padding.p_2xl,
    marginLeft: 18,
    width: width*0.41,
  },
  podcastsParent: {
    marginTop: 23,
    flexDirection: "row",
  },
  try2: {
    textAlign: "left",
  },
  try3: {
    textAlign: "left",
  },
  try4: {
    textAlign: "left",
  },
  try5: {
    textAlign: "left",
  },
  scroll: {
    zIndex: 1,
    alignSelf: "stretch",
    flex: 1,
  },
  generateScript: {
    fontSize: FontSize.size_mid,
    fontFamily: FontFamily.sourceCodeProSemiBold,
    width: 207,
    textAlign: "center",
    color: Color.neutral10,
    fontWeight: "600",
  },
  touchableopacity: {
    paddingHorizontal: Padding.p_16xl,
    paddingVertical: 10,
    backgroundColor: "transparent",
    justifyContent: "center",
    borderRadius: Border.br_xs,
    flexDirection: "row",
    alignItems: "center",
  
  },
  startBlank: {
    height: 812,
    paddingTop: Padding.p_11xl,
    overflow: "hidden",
    backgroundColor: Color.darkBg,
  },
});

export default StartBlank;