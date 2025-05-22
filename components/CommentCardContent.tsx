import colors from "@/theme/colors";
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
        <View style={styles.authorContainer}>
          <Text style={styles.authorText}>{comment.author}</Text>
          {comment.isHateful && (
            <View style={styles.hatefulBadge}>
              <Text style={styles.hatefulBadgeText}>
                {t("hateful_badge") || "Hateful"}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.timeText}>{formatMailStyleDate(comment.time)}</Text>
      </View>
      <Text style={styles.commentText} numberOfLines={4}>
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
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  hatefulBadge: {
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  hatefulBadgeText: {
    color: colors.surfaceLight[900],
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  authorText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 12,
    color: colors.baseDark[500],
  },
  commentText: {
    fontSize: 14,
    marginTop: 4,
  },
});
