import { t } from "i18next";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { formatMailStyleDate } from "../utils/dateUtils";

interface CommentCardContentProps {
  comment: {
    id: string;
    text: string;
    author: string;
    time: string;
    isHateful: boolean;
  };
}

export function CommentCardContent({ comment }: CommentCardContentProps) {
  return (
    <View
      style={styles.cardContent}
      accessibilityLabel={t("open_comment_details") || "Open comment details"}
      accessibilityRole="button"
      testID={`comment-${comment.id}`}
    >
      <View style={styles.header}>
        {/* Red dot for hateful comments */}
        {comment.isHateful && <View style={styles.redDot} />}
        <Text style={styles.authorText}>{comment.author}</Text>
        <Text style={styles.timeText}>{formatMailStyleDate(comment.time)}</Text>
      </View>
      <Text style={styles.commentText} numberOfLines={2}>
        {comment.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
    marginRight: 8,
  },
  authorText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  timeText: {
    fontSize: 12,
    color: "#888",
    marginLeft: 8,
  },
  commentText: {
    fontSize: 14,
    marginTop: 4,
  },
});
