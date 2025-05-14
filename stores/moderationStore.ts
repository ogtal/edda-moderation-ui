import { create } from "zustand";

interface ModerationState {
  moderateComment: (id: string, action: "keep" | "delete") => void;
}

export const useModerationStore = create<ModerationState>((set) => ({
  moderateComment: (id, action) => {
    console.log(`Comment ${id} has been ${action === "keep" ? "kept" : "deleted"}.`);
    // Here, you would trigger the backend API call to Facebook.
  },
}));