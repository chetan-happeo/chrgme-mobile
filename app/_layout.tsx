import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import "react-native-reanimated";

import ApiClient from "@/utils/ApiClient";
import { ThemeContext } from "@/contexts/themeContexts";
import AuthHelper from "@/helpers/AuthHelper";

// Prevent the splash screen from auto-hiding until we"re ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };



  useEffect(() => {
    if (fontsLoaded) {
      AuthHelper.init()
        .then(helper => {

          const { authToken, refreshToken } = helper.tokens;
          return ApiClient
            .init(authToken, refreshToken, helper.saveTokens, helper.clearTokens)

        }).finally(() => {
          SplashScreen.hideAsync();
        })
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <>
      <IconRegistry icons={EvaIconsPack} />

      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva[theme]}>

          <Stack>
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          </Stack>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
}
