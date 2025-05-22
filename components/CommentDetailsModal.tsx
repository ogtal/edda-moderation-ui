import { t } from "i18next";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BaseModal } from "./BaseModal";
import { CommentModalButtons } from "./CommentModalButtons";

interface CommentDetailsModalProps {
  isVisible: boolean;
  onClose: () => void;
  comment: { id: string; text: string; author: string; thread: string };
  onModerate: (id: string, action: "keep" | "delete" | "hide") => void;
}

export function CommentDetailsModal({
  isVisible,
  onClose,
  comment,
  onModerate,
}: CommentDetailsModalProps) {
  return (
    <BaseModal
      isVisible={isVisible}
      onClose={onClose}
      title={t("comment_details") || "Comment Details"}
    >
      {/* Comment Buttons */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <CommentModalButtons
          commentId={comment.id}
          onModerate={(id, action) => {
            onModerate(id, action);
            onClose();
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
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});
