const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import OnBoarding from "./screens/OnBoarding";
import GeneratingVideo from "./screens/GeneratingVideo";
import SplashScreen from "./screens/SplashScreen";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import HomeScreen from "./screens/HomeScreen";
import StartBlank from "./screens/StartBlank";
import GenerateScript from "./screens/GenerateScript";
import ExplorePrompts from "./screens/ExplorePrompts";
import ProcessingVideo from "./screens/ProcessingVideo";
import VideoIsReady from "./screens/VideoIsReady";
import StartScript from "./screens/StartScript";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Modal } from "react-native-paper";
import InternetConnection from "./screens/internetConnection";
import { useDispatch, useSelector } from "react-redux";
import { setConnectionStatus } from "./src/redux/netInfoSlice";
import NetInfo from '@react-native-community/netinfo';


const App = () => {

  const [hideSplashScreen, setHideSplashScreen] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [loading, setLoading] = useState(false);



  const handleRetry = () => {

    setLoading(true);
    setTimeout(() => {
      NetInfo.fetch().then(state => {
        setLoading(false);
        console.log("retried");
      });
    }, 2000);
  };

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 3000);
  }, []);
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.internet.isConnected);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setConnectionStatus(state.isConnected));
    });

    NetInfo.fetch().then((state) => {
      dispatch(setConnectionStatus(state.isConnected));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, isConnected]);
  return (
    <>
      <InternetConnection visible={!isConnected} onRetry={handleRetry} loading={loading} />

      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator
            initialRouteName="PrivacyPolicy"
            screenOptions={{ headerShown: false }}
          >


            {isFirstLaunch && (
              <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicy}
                options={{ headerShown: false }}
              />

            )}
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OnBoarding"
              component={OnBoarding}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="StartScript"
              component={StartScript}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="GeneratingVideo"
              component={GeneratingVideo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VideoIsReady"
              component={VideoIsReady}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />

           

            <Stack.Screen
              name="StartBlank"
              component={StartBlank}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GenerateScript"
              component={GenerateScript}
              options={{ headerShown: false }}
            />
           
            <Stack.Screen
              name="ExplorePrompts"
              component={ExplorePrompts}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProcessingVideo"
              component={ProcessingVideo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="internetConnection"
              component={InternetConnection}
              options={{ headerShown: false, presentation: Modal }}
            />
          </Stack.Navigator>
        ) : (
          <SplashScreen />
        )}
      </NavigationContainer>
    </>
  );
};

export default App;
