import colors from "@/theme/colors";
import { t } from "i18next";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CommentCard from "../../components/CommentCard";
import { useModerationStore } from "../../stores/moderationStore";

export default function Search() {
  const { comments, moderateComment } = useModerationStore();
  const [query, setQuery] = useState("");

  // Filter comments based on the search query
  const filteredComments = comments.filter(
    (comment) =>
      comment.text.toLowerCase().includes(query.toLowerCase()) ||
      comment.author.toLowerCase().includes(query.toLowerCase()) ||
      comment.thread.toLowerCase().includes(query.toLowerCase())
  );

  const handleModeration = (id: string, action: "keep" | "delete" | "hide") => {
    moderateComment(id, action);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder={t("search_placeholder") || "Search comments..."}
        placeholderTextColor={colors.baseDark[200]}
        value={query}
        onChangeText={setQuery}
        accessibilityLabel={t("search_input") || "Search input"}
        accessibilityRole="search"
        testID="search-input"
      />
      {filteredComments.length > 0 ? (
        <FlatList
          data={filteredComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CommentCard comment={item} onModerate={handleModeration} />
          )}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            {t("no_results") || "No comments match your search"}
          </Text>
        </View>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    height: 40,
    borderColor: colors.baseDark[200],
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: colors.baseDark[900],
  },
  list: {
    paddingBottom: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.baseDark[500],
  },
});
