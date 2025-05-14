import { Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CommentCard from "../components/CommentCard";
import { useModerationStore } from "../stores/moderationStore";

interface Comment {
  id: string;
  text: string;
  isHateful: boolean;
}

const dummyComments: Comment[] = [
  { id: "1", text: "This is a great post!", isHateful: false },
  { id: "2", text: "I disagree with this completely.", isHateful: true },
  { id: "3", text: "Please check your facts before posting.", isHateful: true },
  { id: "4", text: "Nice work!", isHateful: false },
  { id: "5", text: "This is offensive and rude.", isHateful: true },
];

export default function Index() {
  const { moderateComment } = useModerationStore();
  const [filter, setFilter] = useState<"hateful" | "nonHateful">("hateful");
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const filteredComments = dummyComments.filter((comment) =>
    filter === "hateful" ? comment.isHateful : !comment.isHateful
  );

  const handleModeration = (id: string, action: "keep" | "delete") => {
    moderateComment(id, action);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("moderation_title")}</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
          testID="filter-icon-button"
          accessibilityLabel={t("filter_open") || "Open Filter"}
          accessibilityRole="button"
        >
          <Ionicons name="filter" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredComments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentCard
            comment={item}
            onModerate={handleModeration}
          />
        )}
      />

      {/* Filter Modal */}
      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("filter_title") || "Filter Options"}</Text>
            <TouchableOpacity
              style={[
                styles.filterOption,
                filter === "hateful" && styles.activeFilterOption,
              ]}
              onPress={() => {
                setFilter("hateful");
                setFilterModalVisible(false);
              }}
              testID="filter-hateful-option"
              accessibilityLabel={t("filter_hateful") || "Hateful"}
              accessibilityRole="button"
            >
              <Text style={styles.filterOptionText}>{t("filter_hateful") || "Hateful"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                filter === "nonHateful" && styles.activeFilterOption,
              ]}
              onPress={() => {
                setFilter("nonHateful");
                setFilterModalVisible(false);
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
              onPress={() => setFilterModalVisible(false)}
              testID="close-filter-modal"
              accessibilityLabel={t("filter_close") || "Close Filter"}
              accessibilityRole="button"
            >
              <Text style={styles.closeButtonText}>{t("close") || "Close"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  filterButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#ffffff",
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
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  activeFilterOption: {
    backgroundColor: "#007BFF",
  },
  filterOptionText: {
    fontSize: 16,
    color: "#000",
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
