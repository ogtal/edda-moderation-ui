import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
}

interface CommentCardProps {
  comment: Comment;
  onModerate: (id: string, action: "keep" | "delete") => void;
}

export default function CommentCard({ comment, onModerate }: CommentCardProps) {
  const translateX = useSharedValue(0);

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

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.commentContainer, animatedStyle]}>
        <Text style={styles.commentText} accessibilityLabel={comment.text}>
          {comment.text}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => onModerate(comment.id, "keep")}
            testID={`keep-button-${comment.id}`}
            accessibilityLabel="Keep"
            accessibilityRole="button"
            style={styles.actionButton}
          >
            <Ionicons name="checkmark" size={20} color="#007BFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onModerate(comment.id, "delete")}
            testID={`delete-button-${comment.id}`}
            accessibilityLabel="Delete"
            accessibilityRole="button"
            style={styles.actionButton}
          >
            <Ionicons name="trash-outline" size={20} color="#007BFF" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
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
    padding: 8,
  },
});
