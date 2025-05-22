import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

interface InlineActionButtonProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export function InlineActionButton({
  label,
  icon,
  onPress,
}: InlineActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={18} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create<{
  button: ViewStyle;
  icon: TextStyle;
  label: TextStyle;
  pressed: ViewStyle;
}>({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginLeft: 12,
  },
  icon: {
    color: colors.baseDark.DEFAULT,
  },
  label: {
    marginLeft: 4,
    color: colors.baseDark.DEFAULT,
    fontSize: 14,
  },
  pressed: {
    backgroundColor: colors.primary[200],
  },
});
