import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { IconActionButton } from "./IconActionButton";

interface CommentModalButtonsProps {
  commentId: string;
  onModerate: (id: string, action: "keep" | "delete" | "hide") => void;
}

export function CommentModalButtons({
  commentId,
  onModerate,
}: CommentModalButtonsProps) {
  const { width } = useWindowDimensions();

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
    {
      type: "hide",
      label: t("hide") || "Hide",
      icon: "eye-off-outline",
    },
    {
      type: "delete",
      label: t("delete") || "Delete",
      icon: "trash-outline",
    },
  ];

  return (
    <View style={styles.container}>
      {actions.map(({ type, label, icon }) => (
        <IconActionButton
          key={type}
          label={label}
          icon={icon}
          onPress={() => onModerate(commentId, type)}
          width={(width - 48) / 3}
          backgroundColor={colors.fadedPrimary}
          iconColor={colors.charchoal}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginTop: 12,
  },
});
