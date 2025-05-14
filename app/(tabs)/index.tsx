import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CommentCard from "../../components/CommentCard";
import FilterModal from "../../components/FilterModal";
import Header from "../../components/Header";
import { useModerationStore } from "../../stores/moderationStore";

interface Comment {
  id: string;
  text: string;
  isHateful: boolean;
}

const dummyComments: Comment[] = [
  { id: "1", text: "This is a great post!", isHateful: false },
  { id: "2", text: "I disagree with this completely.", isHateful: true },
  { id: "3", text: "Please check your facts before posting.", isHateful: true },
  { id: "4", text: "Nice work!", isHateful: false },
  { id: "5", text: "This is offensive and rude.", isHateful: true },
];

export default function Index() {
  const { moderateComment } = useModerationStore();
  const [filter, setFilter] = useState<"hateful" | "nonHateful">("hateful");
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const filteredComments = dummyComments.filter((comment) =>
    filter === "hateful" ? comment.isHateful : !comment.isHateful
  );

  const handleModeration = (id: string, action: "keep" | "delete") => {
    moderateComment(id, action);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Header onFilterPress={() => setFilterModalVisible(true)} />
      <FlatList
        data={filteredComments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentCard comment={item} onModerate={handleModeration} />
        )}
      />
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
    padding: 16,
    backgroundColor: "#ffffff",
  },
});
