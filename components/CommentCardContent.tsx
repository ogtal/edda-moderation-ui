// CommentCardContent.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CommentCardContentProps {
  comment: { id: string; text: string };
}

export function CommentCardContent({ comment }: CommentCardContentProps) {
  return (
    <View
      style={styles.cardContent}
      accessibilityLabel="Open comment details"
      accessibilityRole="button"
      testID={`comment-${comment.id}`}
    >
      <Text style={styles.commentText}>{comment.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    marginBottom: 8,
  },
  commentText: {
    fontSize: 16,
  },
});
