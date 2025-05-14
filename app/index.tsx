import { t } from "i18next";
import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useModerationStore } from "../stores/moderationStore";

interface Comment {
  id: string;
  text: string;
}

const dummyComments: Comment[] = [
  { id: "1", text: "This is a great post!" },
  { id: "2", text: "I disagree with this completely." },
  { id: "3", text: "Please check your facts before posting." },
];

export default function Index() {
  const { moderateComment } = useModerationStore();

  const handleModeration = (id: string, action: "keep" | "delete") => {
    moderateComment(id, action);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("moderation_title")}</Text>
      <FlatList
        data={dummyComments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentText} accessibilityLabel={item.text}>
              {item.text}
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                title={t("keep") || "Keep"}
                onPress={() => handleModeration(item.id, "keep")}
                testID={`keep-button-${item.id}`}
                accessibilityLabel={t("keep") || "Keep"}
              />
              <Button
                title={t("delete") || "Delete"}
                onPress={() => handleModeration(item.id, "delete")}
                testID={`delete-button-${item.id}`}
                accessibilityLabel={t("delete") || "Delete"}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  commentContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    width: "100%",
  },
  commentText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
