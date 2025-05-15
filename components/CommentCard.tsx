import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Layout,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { CommentCardButtons } from "./CommentCardButtons";
import { CommentCardContent } from "./CommentCardContent";
import { CommentDetailsModal } from "./CommentDetailsModal";
import { SwipeActionBox } from "./SwipeActionBox";

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
      } else if (translateX.value > 100) {
        runOnJS(onModerate)(comment.id, "keep");
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
      <Animated.View
        style={styles.container}
        layout={Layout.springify()} // Enable layout animation
      >
        {/* Swipe Action Boxes */}
        <SwipeActionBox type="delete" translateX={translateX} />
        <SwipeActionBox type="keep" translateX={translateX} />

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
      </Animated.View>

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
  commentContainer: {
    backgroundColor: "#fff",
    zIndex: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
});
