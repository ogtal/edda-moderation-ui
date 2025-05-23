import { create } from "zustand";
import { Comment } from "../types/comment";

interface ModerationState {
  comments: Comment[];
  loading: boolean;
  fetchComments: () => Promise<void>;
  moderateComment: (
    id: string,
    action: "keep" | "delete" | "hide"
  ) => Promise<void>;
}

export const useModerationStore = create<ModerationState>((set, get) => ({
  comments: [],
  loading: false,
  fetchComments: async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments?_limit=50"
      );
      const data = await response.json();

      const comments = data.map((item: any) => ({
        id: item.id.toString(),
        text: item.body,
        author: item.email,
        thread: `Post ${item.postId}`,
        isHateful: Math.random() < 0.5,
        time: new Date(
          Date.now() - Math.floor(Math.random() * 1000000000)
        ).toISOString(),
      }));

      set({ comments });
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  },
  moderateComment: async (id, action) => {
    const previousComments = get().comments;

    // Optimistically update the UI
    set((state) => ({
      comments: state.comments.filter((comment) => comment.id !== id),
      loading: true,
    }));

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments/${id}`,
        {
          method: action === "delete" ? "DELETE" : "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to moderate comment");
      }

      console.log(`Comment ${id} successfully ${action}d.`);
    } catch (error) {
      console.error(`Failed to ${action} comment ${id}:`, error);

      // Rollback the optimistic update
      set({ comments: previousComments });
    } finally {
      set({ loading: false });
    }
  },
}));
