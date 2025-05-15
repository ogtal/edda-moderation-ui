import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CommentCard from "../../components/CommentCard";
import FilterModal from "../../components/FilterModal";
import Header from "../../components/Header";
import { useModerationStore } from "../../stores/moderationStore";

export default function Index() {
  const { comments, fetchComments, moderateComment } = useModerationStore();
  const [filter, setFilter] = useState<"hateful" | "nonHateful">("hateful");
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchComments();
    setRefreshing(false);
  };

  const filteredComments = comments.filter((comment) =>
    filter === "hateful" ? comment.isHateful : !comment.isHateful
  );

  const handleModeration = (id: string, action: "keep" | "delete" | "hide") => {
    moderateComment(id, action);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Header onFilterPress={() => setFilterModalVisible(true)} />
      {filteredComments.length > 0 ? (
        <FlatList
          data={filteredComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CommentCard comment={item} onModerate={handleModeration} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#007BFF" // Optional iOS style
              colors={["#007BFF"]} // Android spinner colors
            />
          }
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            {t("no_comments") || "No comments to display"}
          </Text>
        </View>
      )}
      <FilterModal
        visible={isFilterModalVisible}
        filter={filter}
        onClose={() => setFilterModalVisible(false)}
        onSelectFilter={setFilter}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888888",
  },
});
