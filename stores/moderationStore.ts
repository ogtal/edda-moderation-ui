import { create } from "zustand";
import { Comment } from "../types/comment";

interface ModerationState {
  comments: Comment[];
  fetchComments: () => Promise<void>;
  moderateComment: (id: string, action: "keep" | "delete" | "hide") => void;
}

export const useModerationStore = create<ModerationState>((set) => ({
  comments: [],
  fetchComments: async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments?_limit=50"
      );
      const data = await response.json();

      // Transform the data to match the Comment interface
      const comments = data.map((item: any) => ({
        id: item.id.toString(),
        text: item.body,
        author: item.email,
        thread: `Post ${item.postId}`,
        isHateful: Math.random() < 0.5, // Randomly assign true or false
        // generate a random timestamp in iso format
        time: new Date(
          Date.now() - Math.floor(Math.random() * 1000000000)
        ).toISOString(),
      }));

      set({ comments });
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  },
  moderateComment: (id, action) => {
    console.log(`Moderating comment ${id} with action: ${action}`);

    set((state) => ({
      comments: state.comments
        .filter((comment) => (action === "delete" ? comment.id !== id : true))
        .filter((comment) => (action === "keep" ? comment.id !== id : true))
        .filter((comment) => (action === "hide" ? comment.id !== id : true)),
    }));

    if (action === "keep") {
      console.log(`Comment ${id} has been kept.`);
    } else if (action === "delete") {
      console.log(`Comment ${id} has been deleted.`);
    } else if (action === "hide") {
      console.log(`Comment ${id} has been hidden.`);
    }
  },
}));
