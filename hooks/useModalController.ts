import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";

export function useModalController() {
  const modalRef = useRef<BottomSheetModal>(null);

  const openModal = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    modalRef.current?.close();
  }, []);

  return {
    modalRef,
    openModal,
    closeModal,
  };
}
