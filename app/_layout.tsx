import colors from "@/theme/colors";
import { Stack } from "expo-router";
import React from "react";
import "../locales/i18n";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        navigationBarColor: colors.fadedPrimary,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
