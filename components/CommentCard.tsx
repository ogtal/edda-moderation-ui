import { Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Comment {
  id: string;
  text: string;
  isHateful: boolean;
  author: string;
  thread: string;
}

interface CommentCardProps {
  comment: Comment;
  onModerate: (id: string, action: "keep" | "delete" | "hide") => void;
}

export default function CommentCard({ comment, onModerate }: CommentCardProps) {
  const translateX = useSharedValue(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value > 100) {
        runOnJS(onModerate)(comment.id, "keep");
      } else if (translateX.value < -100) {
        runOnJS(onModerate)(comment.id, "delete");
      }
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  return (
    <>
      <GestureDetector gesture={panGesture}>
        <Pressable
          onPress={handleOpenModal}
          style={({ pressed }) => [styles.card, pressed && styles.pressedCard]}
          accessibilityLabel={
            t("open_comment_details") || "Open comment details"
          }
          accessibilityRole="button"
          testID={`comment-${comment.id}`}
        >
          <Animated.View style={[styles.commentContainer, animatedStyle]}>
            <Text style={styles.commentText}>{comment.text}</Text>
            <View style={styles.buttonContainer}>
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  onModerate(comment.id, "keep");
                }}
                testID={`keep-button-${comment.id}`}
                accessibilityLabel={t("keep_comment") || "Keep Comment"}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.actionButton,
                  pressed && styles.pressedButton,
                ]}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color="#007BFF"
                />
                <Text style={styles.actionText}>{t("keep") || "Keep"}</Text>
              </Pressable>
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  onModerate(comment.id, "hide");
                }}
                testID={`hide-button-${comment.id}`}
                accessibilityLabel={t("hide_comment") || "Hide Comment"}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.actionButton,
                  pressed && styles.pressedButton,
                ]}
              >
                <Ionicons name="eye-off-outline" size={20} color="#007BFF" />
                <Text style={styles.actionText}>{t("hide") || "Hide"}</Text>
              </Pressable>
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  onModerate(comment.id, "delete");
                }}
                testID={`delete-button-${comment.id}`}
                accessibilityLabel={t("delete_comment") || "Delete Comment"}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.actionButton,
                  pressed && styles.pressedButton,
                ]}
              >
                <Ionicons name="trash-outline" size={20} color="#007BFF" />
                <Text style={styles.actionText}>{t("delete") || "Delete"}</Text>
              </Pressable>
            </View>
          </Animated.View>
        </Pressable>
      </GestureDetector>

      {/* Full-Screen Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
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
            onPress={handleCloseModal}
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
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  pressedCard: {
    opacity: 0.9,
  },
  commentContainer: {
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
    justifyContent: "flex-end",
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  pressedButton: {
    opacity: 0.7,
  },
  actionText: {
    marginLeft: 4,
    color: "#007BFF",
    fontSize: 14,
  },
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
