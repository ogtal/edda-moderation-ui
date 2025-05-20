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
            backgroundColor: colors.primary100,
            borderTopWidth: 0,
            paddingTop: 15,
            height: 120,
          },

          tabBarActiveTintColor: colors.primary,
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
                size={32}
              />
            ),
            sceneStyle: {
              backgroundColor: colors.white,
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
                size={32}
              />
            ),
            sceneStyle: {
              backgroundColor: colors.white,
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
                size={32}
              />
            ),
            sceneStyle: {
              backgroundColor: colors.white,
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
