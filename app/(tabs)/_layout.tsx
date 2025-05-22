import DropdownMenu from "@/components/DropdownMenu";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { t } from "i18next";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import colors from "../../theme/colors";

export default function TabLayout() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.surfaceLight.DEFAULT,
            borderTopWidth: 0,
          },

          tabBarActiveTintColor: colors.primary.DEFAULT,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setDropdownVisible(true)}
              style={{ marginRight: 16 }}
              accessibilityLabel={t("settings_menu")}
              accessibilityRole="button"
            >
              <Ionicons name="person" size={24} />
            </TouchableOpacity>
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("home"),
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={color}
                size={24}
              />
            ),
            sceneStyle: {
              backgroundColor: colors.surfaceLight.DEFAULT,
            },
            headerStyle: {
              backgroundColor: colors.surfaceLight.DEFAULT,
            },
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: t("search"),
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                color={color}
                size={24}
              />
            ),
            sceneStyle: {
              backgroundColor: colors.surfaceLight.DEFAULT,
            },
            headerStyle: {
              backgroundColor: colors.surfaceLight.DEFAULT,
            },
          }}
        />
        <Tabs.Screen
          name="faq"
          options={{
            title: t("faq"),
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "help-circle" : "help-circle-outline"}
                color={color}
                size={24}
              />
            ),
            sceneStyle: {
              backgroundColor: colors.surfaceLight.DEFAULT,
            },
            headerStyle: {
              backgroundColor: colors.surfaceLight.DEFAULT,
            },
          }}
        />
      </Tabs>

      {/* Dropdown Menu */}
      <DropdownMenu
        isVisible={isDropdownVisible}
        onClose={() => setDropdownVisible(false)}
      />
    </>
  );
}
