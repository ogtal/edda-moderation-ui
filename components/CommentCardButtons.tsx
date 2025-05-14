import { Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CommentCardButtonsProps {
  commentId: string;
  onModerate: (id: string, action: "keep" | "delete" | "hide") => void;
}

export function CommentCardButtons({
  commentId,
  onModerate,
}: CommentCardButtonsProps) {
  return (
    <View style={styles.buttonContainer}>
      {["keep", "hide", "delete"].map((action) => (
        <Pressable
          key={action}
          onPress={(e) => {
            e.stopPropagation();
            onModerate(commentId, action as "keep" | "delete" | "hide");
          }}
          testID={`${action}-button-${commentId}`}
          accessibilityLabel={t(`${action}_comment`) || `${action} Comment`}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Ionicons
            name={
              action === "keep"
                ? "checkmark-circle-outline"
                : action === "hide"
                ? "eye-off-outline"
                : "trash-outline"
            }
            size={20}
            color="#007BFF"
          />
          <Text style={styles.actionText}>
            {t(action) || action.charAt(0).toUpperCase() + action.slice(1)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  pressedButton: {
    opacity: 0.7,
  },
  actionText: {
    marginLeft: 4,
    color: "#007BFF",
    fontSize: 14,
  },
});
