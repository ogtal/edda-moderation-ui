import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { t } from "i18next";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../theme/colors";

export default function TabLayout() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  const handleNavigate = (route: "/settings" | "/privacy") => {
    setDropdownVisible(false);
    router.push(route);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.primary100,
            borderTopWidth: 0,
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
                size={24}
              />
            ),
            sceneStyle: {
              backgroundColor: colors.platinum,
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
          }}
        />
      </Tabs>

      {/* Dropdown Menu */}
      {isDropdownVisible && (
        <Modal
          transparent
          animationType="fade"
          visible={isDropdownVisible}
          onRequestClose={() => setDropdownVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPressOut={() =>
              requestAnimationFrame(() => setDropdownVisible(false))
            }
          >
            <View style={styles.dropdownContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.dropdownItem,
                  pressed && styles.pressedItem,
                  { borderBottomWidth: 1, borderBottomColor: "#eee" },
                ]}
                onPress={() => handleNavigate("/settings")}
                accessibilityLabel={t("navigate_to_settings")}
                accessibilityRole="button"
              >
                <Ionicons name="settings-outline" size={20} color="#007BFF" />
                <Text style={styles.dropdownText}>{t("settings")}</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.dropdownItem,
                  pressed && styles.pressedItem,
                ]}
                onPress={() => handleNavigate("/privacy")}
                accessibilityLabel={t("navigate to privacy_policy")}
                accessibilityRole="button"
              >
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#007BFF"
                />
                <Text style={styles.dropdownText}>{t("privacy_policy")}</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },

  dropdownContainer: {
    position: "absolute",
    top: 60, // adjust as needed
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
  },
  pressedItem: {
    backgroundColor: "#f0f0f0",
  },
});
