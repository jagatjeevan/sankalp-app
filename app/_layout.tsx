import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "../hooks/use-color-scheme";
import { AuthProvider, useAuth } from "./contexts/auth-context";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          animation: "fade",
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="todos" options={{ headerShown: true }} />
            <Stack.Screen
              name="modal"
              options={{
                presentation: "modal",
                title: "Modal",
                animation: "fade",
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="login"
              options={{ headerShown: false, animation: "fade" }}
            />
            <Stack.Screen
              name="signup"
              options={{ presentation: "card", title: "Sign Up" }}
            />
            <Stack.Screen
              name="forgot-password"
              options={{ presentation: "card", title: "Forgot Password" }}
            />
          </>
        )}
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
