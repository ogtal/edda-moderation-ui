import { t } from "i18next";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FilterModalProps {
  filter: "hateful" | "nonHateful";
  onClose: () => void;
  onSelectFilter: (filter: "hateful" | "nonHateful") => void;
}

export default function FilterModal({
  filter,
  onClose,
  onSelectFilter,
}: FilterModalProps) {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.filterOption,
          filter === "hateful" && styles.activeFilterOption,
        ]}
        onPress={() => {
          onSelectFilter("hateful");
          onClose();
        }}
        testID="filter-hateful-option"
        accessibilityLabel={t("filter_hateful") || "Hateful"}
        accessibilityRole="button"
      >
        <Text style={styles.filterOptionText}>
          {t("filter_hateful") || "Hateful"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterOption,
          filter === "nonHateful" && styles.activeFilterOption,
        ]}
        onPress={() => {
          onSelectFilter("nonHateful");
          onClose();
        }}
        testID="filter-non-hateful-option"
        accessibilityLabel={t("filter_non_hateful") || "Non-Hateful"}
        accessibilityRole="button"
      >
        <Text style={styles.filterOptionText}>
          {t("filter_non_hateful") || "Non-Hateful"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filterOption: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  activeFilterOption: {
    backgroundColor: "#007BFF",
  },
  filterOptionText: {
    fontSize: 16,
    color: "#333",
  },
});
