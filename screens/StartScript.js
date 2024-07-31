import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
const { width, height } = Dimensions.get('window');
import axios from "axios"


const GenerateScript = ({route}) => {

  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [isExecuting, setExecuting] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');
  const [urls, setUrls] = useState('');
  const prompt = "";
  const [Prompt, setPrompt] = useState('');
  const [wordCount, setWordCount] = useState(0);
 
  const { dialectValue } = "";
  const { languageValue } = "";


  const handleVideoNavigator = async () => {
    try {
    
        setLoading(true)
      setExecuting(true); // Set executing state to true to trigger data fetching
      const response = await axios.post(`https://irtiqa-ai-api.azurewebsites.net/generate-story/?prompt=${generatedScript}`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      const urls = response.data["response "].urls;
      console.log(urls)
      if (urls.length === 0) {
        // Handle the case where no URLs are returned
        console.log("No URLs found.");
        handleVideoNavigator()
      }

      setLoading(false)
      console.log("script : ",generatedScript)
      // Navigate to the next screen with necessary data
      navigation.navigate("ProcessingVideo", {
        urls,
        generatedScript,
        dialectValue,
        languageValue
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      handleVideoNavigator()
    } finally {
      setExecuting(false); // Set executing state back to false after completion
    }
  };

  useEffect(() => {
    if (generatedScript.trim().split(/\s+/).length <= 500) {
      setPrompt(generatedScript);
      setWordCount(generatedScript.trim().split(/\s+/).length);
    }
    
  }, [generatedScript]);
  

  const handlePress = (type) => {
    // Code to execute when the button is pressed
    // Addi
    setLoading(true)
    console.log(type,"-------------------------------------------------------------------")
    axios.post(`https://irtiqa-ai-api.azurewebsites.net/regenerate_script?user_script=${generatedScript}&prompt_type=${type}`, {})
    .then(response => {
      console.log(response.data);
      setUrls(response.data.urls) // Handle response data here
      setLoading(false)
    })
    .catch(error => {
      handlePress(type)
      console.error('Error:', error);
    });
  };
    



  if (isLoading) {
    return (
      <View style={[styles.startBlank, styles.startBlankLayout]}>

        <View style={[styles.loadingIconParent, styles.textAreaPosition]}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
          
          <Text style={styles.generatingScript65}>
            Generating Script...
          </Text>
          <Text
            style={[styles.generatingScriptMay, styles.generateVideoPosition]}
          >{`Generating script may take a few seconds. Please don’t quit the app.`}</Text>
        </View>
      </View>
    );
  }

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
          Script Editor
        </Text>
        {/* <Image
          style={styles.icons}
          resizeMode="cover"
          source={require("../assets/icons.png")}
        /> */}
      </View>
      <View style={styles.promptInput}>
        <Text style={[styles.enterPrompt, styles.startBlank1Typo]}>
          Generate Script
        </Text>
        <TextInput
          style={[styles.email, { textAlignVertical: "top" }]}
          placeholder="Paste your content here"
          multiline={true}
          placeholderTextColor="rgba(126, 126, 126, 0.6)"
          onChangeText={setGeneratedScript}
          value={generatedScript}
        />
        <View style={[styles.wordCountContainer, { position: 'absolute', bottom: 12, right: 19 }]}>
          <Text style={styles.wordCount}>{wordCount}/500</Text>
        </View>
      </View>
      <Text style={styles.generateScript1}>Modify Script :</Text>
      <View style={[styles.prompts, styles.promptsFlexBox]}>
        <Pressable style={[styles.shorter, styles.button]} onPress={() => handlePress("Shorter")}>
          <Text style={[styles.shorter1, styles.morePosition]}>Shorter</Text>
        </Pressable>
        <Pressable style={[styles.longer, styles.button]} onPress={() => handlePress("Longer")}>
          <Text style={[styles.longer1, styles.morePosition]}>Longer</Text>
        </Pressable>
        <Pressable style={[styles.simpler, styles.button]}onPress={() => handlePress("Longer")}>
          <Text style={[styles.shorter1, styles.morePosition]}>Simpler</Text>
        </Pressable>
        <Pressable style={[styles.moreCasual, styles.button]}onPress={() => handlePress("Casual")}>
          <Text style={[styles.moreCasual1, styles.morePosition]}>More Casual</Text>
        </Pressable>
        <Pressable style={[styles.moreProfessional, styles.button]}onPress={() => handlePress("Professional")}>
          <Text style={[styles.moreProfessional1, styles.morePosition]}>More Professional</Text>
        </Pressable>
      </View>



      <LinearGradient
        style={[styles.generateButton, !generatedScript && styles.disabledButton]}
        locations={[0, 1]}
        colors={["#6747e7", "#00fff0"]}
        useAngle={true}
        angle={92.42}
      >
        <TouchableOpacity
          style={[styles.touchableopacity, ]}
          activeOpacity={0.2}
          onPress={handleVideoNavigator}
          disabled={!generatedScript}
        >
          <Text style={styles.generateScript}>Generate Video</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingIconParent: {
    top: 309,
    height: 95,
    width: 348,
  },
  wordCountContainer: {
    alignSelf: "flex-end"
  },
  wordCount: {
    color: Color.colorDarkslategray_100,
    fontFamily: FontFamily.robotoRegular,
  },
  disabledButton: {
    opacity: 0.5, // Change the opacity when button is disabled
  },
  textAreaPosition: {
    marginLeft: -174.5,
    left: "50%",
    position: "absolute",
  },
  loadingIcon: {
    marginLeft: -39.1,
    width: 79,
    height: 79,
  },
  buttonChildPosition: {
    top: 0,
    left: "50%",
    position: "absolute",
  },
  generatingScript65: {
    marginLeft: -132.1,
    top: 98,
    fontFamily: FontFamily.montserratSemiBold,
    width: 264,
    height: 25,
    fontSize: FontSize.size_xl,
    textAlign: "center",
    color: Color.neutral10,
    fontWeight: "600",
    left: "50%",
    position: "absolute",
  },
  generatingScriptMay: {
    marginLeft: -174.1,
    top: 147,
    fontSize: 18,
    fontFamily: FontFamily.urbanistRegular,
    height: 48,
    width: 348,
  },
  generateVideoPosition: {
    textAlign: "center",
    color: Color.neutral10,
    left: "50%",
    position: "absolute",
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  promptsFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  morePosition: {
    zIndex: 0,
    fontFamily: FontFamily.urbanistLight,
    fontWeight: "300",
    letterSpacing: 0,
    fontSize: width * 0.025,
    color: Color.neutral10,
  },
  moreSpaceBlock: {
    marginLeft: width * 0.015,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    backgroundColor: Color.darkFrontInput,
    height: 34,
    flexDirection: "row",
    marginBottom: height * 0.015,
  },
  vector: {
    borderStyle: "solid",
    borderColor: Color.neutral10,
    borderWidth: 1.5,
  },
  startBlank: {
    height: 812,
    paddingTop: Padding.p_11xl,

    overflow: "hidden",
    backgroundColor: Color.darkBg,
  },
  startBlankLayout: {
    width: "100%",
    flex: 1,
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
  backIcon: {
    width: 25,
    height: 25,
  },
  icon: {
    overflow: "hidden",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  startBlank1: {
    width: "100%",
    marginLeft:"35%",
    color: Color.neutral10,
  },
  startBlank1Typo: {
    fontFamily: FontFamily.urbanistSemiBold,
    color: Color.neutral10,
    textTransform: "capitalize",
    fontSize: width*0.039,
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
    textAlign: "left",
    color: 'white'
  },
  icons: {
    marginLeft: "15%",
    width: 94,
    height: 50,
  },
  generateScript1: {
    fontWeight: "700",
    fontFamily: FontFamily.latoBold,
    marginTop: height * 0.05,
    textAlign: "left",
    alignSelf: "stretch",
    color: Color.neutral10,
    textTransform: "capitalize",
    fontSize: width * 0.045,
    marginLeft: width * 0.035,
  },
  shorter1: {
    textAlign: "center",
  },
  longer1: {
    textAlign: "center",

  },
  moreCasual1: {
    textAlign: "center",

  },
  moreProfessional1: {
    textAlign: "center",

  },
  prompts: {
    height: 95,
    flexWrap: "wrap",
    marginTop: 17,
    alignSelf: "stretch",
    overflow: "hidden",
    flexDirection: "row",
    paddingLeft: "3%",
  },
  generateButton: {
    marginTop: height*0.070,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: width * 0.90,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
  },

  generateScript: {
    fontSize: FontSize.size_mid,
    fontFamily: FontFamily.sourceCodeProSemiBold,
    width: 207,
    textAlign: "center",
    color: Color.neutral10,
    fontWeight: "600",
  },
  promptInput: {
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowOffset: {
      width: 0,
    },
    shadowRadius: 24,
    elevation: 24,
    shadowOpacity: 1,
    height: height*0.5,
    borderRadius: Border.br_xs,
    alignSelf: "stretch",
    backgroundColor: Color.darkBg,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
  },

  shorter: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    backgroundColor: Color.darkFrontInput,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  longer: {
    marginLeft: 10,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    backgroundColor: Color.darkFrontInput,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  simpler: {
    marginLeft: 10,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    backgroundColor: Color.darkFrontInput,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  moreCasual: {
    marginLeft: 10,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    backgroundColor: Color.darkFrontInput,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  moreProfessional: {
    marginLeft: 10,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    backgroundColor: Color.darkFrontInput,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GenerateScript;
