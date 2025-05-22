import colors from "@/theme/colors";
import { t } from "i18next";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FilterModalProps {
  visible: boolean;
  filter: "hateful" | "nonHateful";
  onClose: () => void;
  onSelectFilter: (filter: "hateful" | "nonHateful") => void;
}

export default function FilterModal({
  visible,
  filter,
  onClose,
  onSelectFilter,
}: FilterModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {t("filter_title") || "Filter Options"}
          </Text>
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
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            testID="close-filter-modal"
            accessibilityLabel={t("filter_close") || "Close Filter"}
            accessibilityRole="button"
          >
            <Text style={styles.closeButtonText}>{t("close") || "Close"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: colors.surfaceLight[500],
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  filterOption: {
    padding: 12,
    marginBottom: 8,
    width: "100%",
    backgroundColor: colors.surfaceLight[200],
    borderRadius: 8,
    alignItems: "center",
  },
  activeFilterOption: {
    backgroundColor: colors.info[500],
  },
  filterOptionText: {
    fontSize: 16,
    color: colors.baseDark[900],
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.primary[500],
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: colors.surfaceLight[500],
    fontSize: 16,
  },
});
