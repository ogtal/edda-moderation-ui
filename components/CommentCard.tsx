import BaseSheet from "@/components/BaseSheet";
import colors from "@/theme/colors";
import * as Haptics from "expo-haptics";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  LinearTransition,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useModalController } from "../hooks/useModalController";
import { Comment } from "../types/comment";
import { CommentCardContent } from "./CommentCardContent";
import CommentDetailsModalContent from "./CommentDetailsModalContent";
import { SwipeActionBox } from "./SwipeActionBox";

interface CommentCardProps {
  comment: Comment;
  onModerate: (id: string, action: "keep" | "delete" | "hide") => void;
}

export default function CommentCard({ comment, onModerate }: CommentCardProps) {
  const translateX = useSharedValue(0);
  const dragOccurred = useSharedValue(false);
  const fadeProgress = useSharedValue(0);
  const { width } = useWindowDimensions();
  const { modalRef, openModal, closeModal } = useModalController();

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
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
        translateX.value = withTiming(-width, { duration: 150 }, () => {
          runOnJS(onModerate)(comment.id, "delete");
        });
      } else if (translateX.value > 100) {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
        translateX.value = withTiming(width, { duration: 150 }, () => {
          runOnJS(onModerate)(comment.id, "keep");
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(500)
    .onBegin(() => {
      fadeProgress.value = withTiming(1, { duration: 300 });
    })
    .onStart(() => {
      runOnJS(Haptics.selectionAsync)();
      runOnJS(openModal)();
    })
    .onFinalize(() => {
      fadeProgress.value = 0;
    });

  const composedGesture = Gesture.Exclusive(panGesture, longPressGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fadeProgress.value,
  }));

  return (
    <>
      <Animated.View
        style={styles.container}
        layout={LinearTransition.duration(200)}
      >
        {/* Swipe Action Boxes */}
        <SwipeActionBox type="delete" translateX={translateX} />
        <SwipeActionBox type="keep" translateX={translateX} />

        {/* Comment Card */}
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.commentContainer, animatedStyle]}>
            <CommentCardContent comment={comment} />

            {/* Grey Fading Effect */}
            <Animated.View style={[styles.fadeOverlay, fadeStyle]} />
          </Animated.View>
        </GestureDetector>
      </Animated.View>

      <BaseSheet ref={modalRef}>
        <CommentDetailsModalContent comment={comment} onModerate={onModerate} />
      </BaseSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: colors.surfaceLight.DEFAULT,
    overflow: "hidden",
  },
  commentContainer: {
    backgroundColor: colors.surfaceLight.DEFAULT,
    zIndex: 1,
    borderBottomColor: colors.baseDark[100],
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  fadeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `${colors.baseDark[500]}40`,
    zIndex: 2,
  },
});
