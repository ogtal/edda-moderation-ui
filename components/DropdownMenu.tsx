import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { t } from "i18next";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface DropdownMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function DropdownMenu({
  isVisible,
  onClose,
}: DropdownMenuProps) {
  const router = useRouter();

  const handleNavigate = (route: "/settings" | "/privacy") => {
    onClose();
    router.push(route);
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.modalOverlay}
        onPressOut={() => requestAnimationFrame(() => onClose())}
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
            accessibilityLabel={t("navigate_to_privacy_policy")}
            accessibilityRole="button"
          >
            <Ionicons name="document-text-outline" size={20} color="#007BFF" />
            <Text style={styles.dropdownText}>{t("privacy_policy")}</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
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
