import { Stack } from "expo-router";
import React from "react";
import "../locales/i18n"; // Import i18n configuration

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
