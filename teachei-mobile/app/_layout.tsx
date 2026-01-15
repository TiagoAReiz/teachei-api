import { useEffect } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/stores/auth-store";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

// Custom theme matching TeAchei design
const TeAcheiLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#137fec",
    background: "#f6f7f8",
    card: "#ffffff",
    text: "#1e293b",
    border: "#e2e8f0",
  },
};

const TeAcheiDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#137fec",
    background: "#101922",
    card: "#1e2936",
    text: "#f1f5f9",
    border: "#334155",
  },
};

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { loadStoredAuth } = useAuthStore();

  // Load fonts
  const [fontsLoaded] = useFonts({
    PlusJakartaSans: require("@expo-google-fonts/plus-jakarta-sans/PlusJakartaSans_400Regular.ttf"),
    "PlusJakartaSans-Medium": require("@expo-google-fonts/plus-jakarta-sans/PlusJakartaSans_500Medium.ttf"),
    "PlusJakartaSans-SemiBold": require("@expo-google-fonts/plus-jakarta-sans/PlusJakartaSans_600SemiBold.ttf"),
    "PlusJakartaSans-Bold": require("@expo-google-fonts/plus-jakarta-sans/PlusJakartaSans_700Bold.ttf"),
    "PlusJakartaSans-ExtraBold": require("@expo-google-fonts/plus-jakarta-sans/PlusJakartaSans_800ExtraBold.ttf"),
  });

  // Load stored auth on app start
  useEffect(() => {
    loadStoredAuth();
  }, []);

  // Hide splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? TeAcheiDarkTheme : TeAcheiLightTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="create" options={{ presentation: "modal" }} />
          <Stack.Screen name="intention/[id]" />
          <Stack.Screen name="user/[id]" />
          <Stack.Screen name="my-intentions" />
        </Stack>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
