import { t } from "i18next";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { CommentModalButtons } from "./CommentModalButtons";

interface CommentDetailsModalProps {
  isVisible: boolean;
  onClose: () => void;
  comment: { id: string; text: string; author: string; thread: string };
  onModerate: (id: string, action: "keep" | "delete" | "hide") => void;
}

export function CommentDetailsModal({
  isVisible,
  onClose,
  comment,
  onModerate,
}: CommentDetailsModalProps) {
  const { height } = useWindowDimensions();
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(height);
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable
          style={styles.overlayPressable}
          onPress={onClose}
          accessibilityLabel={t("close_modal") || "Close Modal"}
          accessibilityRole="button"
        />
        <Animated.View
          style={[
            styles.modalContainer,
            { maxHeight: height * 0.5 },
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.modalTitle}>
              {t("comment_details") || "Comment Details"}
            </Text>
            <Pressable
              onPress={onClose}
              style={styles.closeButton}
              accessibilityLabel={t("close_modal") || "Close Modal"}
              accessibilityRole="button"
            >
              <Text style={styles.closeButtonText}>
                {t("close") || "Close"}
              </Text>
            </Pressable>
          </View>

          {/* Comment Buttons */}
          <CommentModalButtons
            commentId={comment.id}
            onModerate={(id, action) => {
              onModerate(id, action);
              onClose();
            }}
          />

          <View style={styles.content}>
            <Text style={styles.modalText}>
              {t("author") || "Author"}: {comment.author}
            </Text>
            <Text style={styles.modalText}>
              {t("thread") || "Thread"}: {comment.thread}
            </Text>
            <Text style={styles.modalText}>
              {t("content") || "Content"}: {comment.text}
            </Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  overlayPressable: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: "#007BFF",
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
});
