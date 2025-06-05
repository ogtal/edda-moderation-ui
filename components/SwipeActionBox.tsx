import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { t } from "i18next";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface SwipeActionBoxProps {
  type: "delete" | "keep";
  translateX: Animated.SharedValue<number>;
}

export function SwipeActionBox({ type, translateX }: SwipeActionBoxProps) {
  const hasTriggeredHaptic = useRef(false);
  const iconScale = useSharedValue(1);

  const triggerFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const isDelete = type === "delete";
    const threshold = isDelete ? -100 : 100;

    const crossed =
      (isDelete && translateX.value < threshold) ||
      (!isDelete && translateX.value > threshold);

    if (crossed && !hasTriggeredHaptic.current) {
      runOnJS(triggerFeedback)();
      iconScale.value = withSpring(1.1, {}, () => {
        iconScale.value = withSpring(1);
      });
      hasTriggeredHaptic.current = true;
    }

    if (!crossed && hasTriggeredHaptic.current) {
      hasTriggeredHaptic.current = false;
    }

    const isSwipeActive = isDelete
      ? translateX.value < 0
      : translateX.value > 0;

    return {
      opacity: isSwipeActive ? 1 : 0,
      backgroundColor: crossed
        ? isDelete
          ? colors.error.DEFAULT
          : colors.success.DEFAULT
        : colors.baseDark.DEFAULT,
    };
  });

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View
        style={[
          styles.iconContainer,
          type === "delete" ? styles.deleteAlignment : styles.keepAlignment,
        ]}
      >
        <Animated.View style={iconStyle}>
          <Ionicons
            name={type === "delete" ? "trash" : "checkmark"}
            size={24}
            color={colors.surfaceLight.DEFAULT}
            accessibilityLabel={
              type === "delete" ? t("delete_action") : t("keep_action")
            }
            accessibilityRole="image"
          />
        </Animated.View>
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
  iconContainer: {
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
});
