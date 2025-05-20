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
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        const baseStyles = [
          styles.button,
          { backgroundColor },
          width ? { width } : null,
          buttonStyle,
          pressed ? styles.pressed : null,
        ];

        return baseStyles.filter(Boolean);
      }}
    >
      <Ionicons
        name={icon}
        size={20}
        style={[styles.icon, { color: iconColor }]}
      />
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginHorizontal: 6,
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
    backgroundColor: colors.primary200,
    transform: [{ scale: 0.98 }],
  },
});
