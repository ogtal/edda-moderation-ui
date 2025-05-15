import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

interface SwipeActionBoxProps {
  type: "delete" | "keep";
  translateX: Animated.SharedValue<number>;
}

export function SwipeActionBox({ type, translateX }: SwipeActionBoxProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity:
      type === "delete"
        ? translateX.value < -20
          ? 1
          : 0
        : translateX.value > 20
        ? 1
        : 0,
    transform: [
      {
        scale:
          type === "delete"
            ? translateX.value < -20
              ? 1
              : 0.8
            : translateX.value > 20
            ? 1
            : 0.8,
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        type === "delete" ? styles.deleteBox : styles.keepBox,
        animatedStyle,
      ]}
    >
      <Text style={type === "delete" ? styles.deleteText : styles.keepText}>
        {type === "delete" ? "Delete" : "Keep"}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  deleteBox: {
    alignItems: "flex-end",
    backgroundColor: "#ff4d4d",
  },
  keepBox: {
    alignItems: "flex-start",
    backgroundColor: "#4caf50",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  keepText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
