import { create } from "zustand";

interface ModerationState {
  moderateComment: (id: string, action: "keep" | "delete" | "hide") => void;
}

export const useModerationStore = create<ModerationState>((set) => ({
  moderateComment: (id, action) => {
    if (action === "keep") {
      console.log(`Comment ${id} has been kept.`);
    } else if (action === "delete") {
      console.log(`Comment ${id} has been deleted.`);
    } else if (action === "hide") {
      console.log(`Comment ${id} has been hidden.`);
    }
  },
}));