import { t } from "i18next";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface CommentDetailsModalProps {
  isVisible: boolean;
  onClose: () => void;
  comment: { id: string; text: string; author: string; thread: string };
}

export function CommentDetailsModal({
  isVisible,
  onClose,
  comment,
}: CommentDetailsModalProps) {
  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>
          {t("comment_details") || "Comment Details"}
        </Text>
        <Text style={styles.modalText}>
          {t("author") || "Author"}: {comment.author}
        </Text>
        <Text style={styles.modalText}>
          {t("thread") || "Thread"}: {comment.thread}
        </Text>
        <Text style={styles.modalText}>
          {t("content") || "Content"}: {comment.text}
        </Text>
        <Pressable
          onPress={onClose}
          style={({ pressed }) => [
            styles.closeButton,
            pressed && styles.pressedCloseButton,
          ]}
          accessibilityLabel={t("close_modal") || "Close Modal"}
          accessibilityRole="button"
        >
          <Text style={styles.closeButtonText}>{t("close") || "Close"}</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
  pressedCloseButton: {
    backgroundColor: "#0056b3",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
