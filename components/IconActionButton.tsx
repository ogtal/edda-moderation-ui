import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface IconActionButtonProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  width?: number;
  backgroundColor?: string;
  iconColor?: string;
  labelStyle?: TextStyle;
  buttonStyle?: ViewStyle;
}

export function IconActionButton({
  label,
  icon,
  onPress,
  width,
  backgroundColor = "#fff",
  iconColor = "#161616",
  labelStyle,
  buttonStyle,
}: IconActionButtonProps) {
  return (
    <View
      style={[
        styles.buttonWrapper,
        width ? { width } : null,
        { backgroundColor },
        buttonStyle,
      ]}
    >
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.primary200 }}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      >
        <Ionicons
          name={icon}
          size={20}
          style={[styles.icon, { color: iconColor }]}
        />
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 10,
    overflow: "hidden", // CRITICAL for clipping ripple
    marginHorizontal: 6,
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  icon: {
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
});
