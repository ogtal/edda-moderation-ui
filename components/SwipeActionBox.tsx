import * as Haptics from "expo-haptics";
import { t } from "i18next";
import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { runOnJS, useAnimatedStyle } from "react-native-reanimated";

interface SwipeActionBoxProps {
  type: "delete" | "keep";
  translateX: Animated.SharedValue<number>;
}

export function SwipeActionBox({ type, translateX }: SwipeActionBoxProps) {
  const hasTriggeredHaptic = useRef(false); // Track haptic feedback state

  const triggerHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const isDelete = type === "delete";
    const threshold = isDelete ? -100 : 100;

    if (
      (isDelete &&
        translateX.value < threshold &&
        !hasTriggeredHaptic.current) ||
      (!isDelete && translateX.value > threshold && !hasTriggeredHaptic.current)
    ) {
      runOnJS(triggerHapticFeedback)();
      hasTriggeredHaptic.current = true;
    }

    if (
      (isDelete &&
        translateX.value >= threshold &&
        hasTriggeredHaptic.current) ||
      (!isDelete && translateX.value <= threshold && hasTriggeredHaptic.current)
    ) {
      hasTriggeredHaptic.current = false;
    }
    const isSwipeActive = isDelete
      ? translateX.value < 0
      : translateX.value > 0;

    return {
      opacity: isSwipeActive ? 1 : 0,
      backgroundColor: isDelete
        ? translateX.value < threshold
          ? "#ff4d4d"
          : "#B0B0B0"
        : translateX.value > threshold
        ? "#4caf50"
        : "#B0B0B0",
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View
        style={[
          styles.textContainer,
          type === "delete" ? styles.deleteAlignment : styles.keepAlignment,
        ]}
      >
        <Text
          style={type === "delete" ? styles.deleteText : styles.keepText}
          accessibilityLabel={
            type === "delete" ? t("delete_action") : t("keep_action")
          }
          accessibilityRole="text"
        >
          {type === "delete" ? t("delete") : t("keep")}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  textContainer: {
    justifyContent: "center",
  },
  deleteAlignment: {
    alignItems: "flex-end",
    paddingRight: 20,
  },
  keepAlignment: {
    alignItems: "flex-start",
    paddingLeft: 20,
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
