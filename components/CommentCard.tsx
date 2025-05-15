import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { CommentCardButtons } from "./CommentCardButtons";
import { CommentCardContent } from "./CommentCardContent";
import { CommentDetailsModal } from "./CommentDetailsModal";

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
  const dragOccurred = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .minDistance(10)
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onBegin(() => {
      dragOccurred.value = false;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      dragOccurred.value = true;
    })
    .onEnd(() => {
      if (translateX.value < -100) {
        runOnJS(onModerate)(comment.id, "delete");
      }
      translateX.value = withSpring(0);
    });

  const tapGesture = Gesture.Tap().onEnd((_event, success) => {
    if (success && !dragOccurred.value) {
      runOnJS(setModalVisible)(true);
    }
  });

  const composedGesture = Gesture.Exclusive(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const deleteBoxStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < -20 ? 1 : 0,
    transform: [{ scale: translateX.value < -20 ? 1 : 0.8 }],
  }));

  const handleCloseModal = () => setModalVisible(false);

  return (
    <>
      <View style={styles.container}>
        {/* Delete Box */}
        <Animated.View style={[styles.deleteBox, deleteBoxStyle]}>
          <Text style={styles.deleteText}>Delete</Text>
        </Animated.View>

        {/* Comment Card */}
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.commentContainer, animatedStyle]}>
            <CommentCardContent comment={comment} />
            <CommentCardButtons
              commentId={comment.id}
              onModerate={onModerate}
            />
          </Animated.View>
        </GestureDetector>
      </View>

      {/* Comment Details Modal */}
      <CommentDetailsModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        comment={comment}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  deleteBox: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
    backgroundColor: "#ff4d4d",
    zIndex: 0, // behind the card
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  commentContainer: {
    backgroundColor: "#fff",
    zIndex: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
});
