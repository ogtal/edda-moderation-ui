import { Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
  { id: "6", text: "Great job on this project!", isHateful: false },
  { id: "7", text: "This is absolutely unacceptable.", isHateful: true },
  { id: "8", text: "I love this idea!", isHateful: false },
  { id: "9", text: "You should be ashamed of yourself.", isHateful: true },
  { id: "10", text: "Fantastic effort!", isHateful: false },
];

export default function Index() {
  const { moderateComment } = useModerationStore();
  const [filter, setFilter] = useState<"hateful" | "nonHateful">("hateful");
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const handleModeration = (id: string, action: "keep" | "delete" | "hide") => {
    moderateComment(id, action);
  };

  const filteredComments = dummyComments.filter((comment) =>
    filter === "hateful" ? comment.isHateful : !comment.isHateful
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("moderation_title")}</Text>
        {/* Filter Icon Button */}
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

      {/* Comments List */}
      <FlatList
        data={filteredComments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentText} accessibilityLabel={item.text}>
              {item.text}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleModeration(item.id, "keep")}
                testID={`keep-button-${item.id}`}
                accessibilityLabel={t("keep") || "Keep"}
                style={styles.actionButton}
              >
                <Ionicons name="checkmark" size={20} color="#007BFF" />
                <Text style={styles.actionButtonText}>{t("keep") || "Keep"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleModeration(item.id, "delete")}
                testID={`delete-button-${item.id}`}
                accessibilityLabel={t("delete") || "Delete"}
                style={styles.actionButton}
              >
                <Ionicons name="trash-outline" size={20} color="#007BFF" />
                <Text style={styles.actionButtonText}>{t("delete") || "Delete"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleModeration(item.id, "hide")}
                testID={`hide-button-${item.id}`}
                accessibilityLabel={t("hide") || "Hide"}
                style={styles.actionButton}
              >
                <Ionicons name="eye-off-outline" size={20} color="#007BFF" />
                <Text style={styles.actionButtonText}>{t("hide") || "Hide"}</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    </View>
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
  commentContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#007BFF",
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
