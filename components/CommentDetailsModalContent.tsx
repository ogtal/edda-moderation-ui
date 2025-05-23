import { t } from "i18next";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CommentModalButtons } from "./CommentModalButtons";

interface CommentDetailsModalProps {
  comment: { id: string; text: string; author: string; thread: string };
  onModerate: (id: string, action: "keep" | "delete" | "hide") => void;
}

export default function CommentDetailsModalContent({
  comment,
  onModerate,
}: CommentDetailsModalProps) {
  return (
    <View>
      {/* Comment Buttons */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <CommentModalButtons
          commentId={comment.id}
          onModerate={(id, action) => {
            onModerate(id, action);
          }}
        />
      </View>
      <View>
        <Text style={styles.modalText}>
          {t("author") || "Author"}: {comment.author}
        </Text>
        <Text style={styles.modalText}>
          {t("thread") || "Thread"}: {comment.thread}
        </Text>
        <Text style={styles.modalText}>
          {t("content") || "Content"}: {comment.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});
