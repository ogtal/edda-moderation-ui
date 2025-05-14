import React, { useState } from "react";
import { StyleSheet } from "react-native";
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
  const dragOccurred = useSharedValue(false); // \U0001f525 Moved to shared value

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      dragOccurred.value = false;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      dragOccurred.value = true;
    })
    .onEnd(() => {
      if (translateX.value > 100) {
        runOnJS(onModerate)(comment.id, "keep");
      } else if (translateX.value < -100) {
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

  const handleCloseModal = () => setModalVisible(false);

  return (
    <>
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.commentContainer, animatedStyle]}>
          <CommentCardContent comment={comment} />
          <CommentCardButtons commentId={comment.id} onModerate={onModerate} />
        </Animated.View>
      </GestureDetector>
      <CommentDetailsModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        comment={comment}
      />
    </>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
});
