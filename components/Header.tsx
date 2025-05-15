import { Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  onFilterPress: () => void;
}

export default function Header({ onFilterPress }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{t("moderation_title") || "Moderation"}</Text>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={onFilterPress}
        testID="filter-icon-button"
        accessibilityLabel={t("filter_open") || "Open Filter"}
        accessibilityRole="button"
      >
        <Ionicons name="filter" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  filterButton: {
    padding: 8,
  },
});
