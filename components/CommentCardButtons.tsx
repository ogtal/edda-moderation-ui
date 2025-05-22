import { Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import React from "react";
import { StyleSheet, View } from "react-native";
import { InlineActionButton } from "./InlineActionButton";

interface CommentCardButtonsProps {
  commentId: string;
  onModerate: (id: string, action: "keep" | "delete" | "hide") => void;
}

export function CommentCardButtons({
  commentId,
  onModerate,
}: CommentCardButtonsProps) {
  const actions: {
    type: "keep" | "hide" | "delete";
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
  }[] = [
    {
      type: "keep",
      label: t("keep") || "Keep",
      icon: "checkmark-circle-outline",
    },
    { type: "hide", label: t("hide") || "Hide", icon: "eye-off-outline" },
    { type: "delete", label: t("delete") || "Delete", icon: "trash-outline" },
  ];

  return (
    <View style={styles.container}>
      {actions.map(({ type, label, icon }) => (
        <InlineActionButton
          key={type}
          label={label}
          icon={icon}
          onPress={() => onModerate(commentId, type)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between", // Ensures even spacing between buttons
    alignItems: "center",
    marginTop: 8,
    paddingHorizontal: 16, // Adds padding to prevent buttons from touching edges
  },
});
