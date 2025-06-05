import BaseSheet from "@/components/BaseSheet";
import FilterModalContent from "@/components/FilterModalContent";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import CommentCard from "../../components/CommentCard";
import Header from "../../components/Header";
import { useModalController } from "../../hooks/useModalController";
import { useModerationStore } from "../../stores/moderationStore";
import colors from "../../theme/colors";

export default function Index() {
  const { comments, fetchComments, moderateComment } = useModerationStore();
  const [filter, setFilter] = useState<"hateful" | "both">("hateful");

  const { modalRef, openModal, closeModal } = useModalController();

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
    filter === "hateful" ? comment.isHateful : true
  );

  const handleModeration = (id: string, action: "keep" | "delete" | "hide") => {
    moderateComment(id, action);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredComments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentCard comment={item} onModerate={handleModeration} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={<Header onFilterPress={openModal} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {t("no_comments") || "No comments to display"}
            </Text>
          </View>
        }
      />

      <BaseSheet ref={modalRef}>
        <FilterModalContent
          includeNonHateful={filter === "both"}
          onClose={closeModal}
          onToggleIncludeNonHateful={(include) => {
            setFilter(include ? "both" : "hateful");
            closeModal();
            console.log("Selected filter:", include ? "both" : "hateful");
          }}
        />
      </BaseSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.secondary.DEFAULT,
  },
});
