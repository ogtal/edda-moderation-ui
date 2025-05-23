// CustomBottomSheet.tsx
import colors from "@/theme/colors";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

type CustomBottomSheetProps = {
  children: React.ReactNode;
  onClose?: () => void;
  onChange?: (index: number) => void;
};

const CustomBottomSheet = forwardRef<BottomSheetModal, CustomBottomSheetProps>(
  ({ children, onChange }, ref) => {
    const { height } = useWindowDimensions();

    return (
      <BottomSheetModal
        ref={ref}
        onChange={onChange}
        backgroundStyle={styles.sheetBackground}
        snapPoints={[height * 0.5]}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop
            {...backdropProps}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetView style={styles.container}>
          <View style={styles.content}>{children}</View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  sheetBackground: {
    backgroundColor: colors.surfaceLight.DEFAULT,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.baseDark.DEFAULT,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: colors.primary.DEFAULT,
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
});

export default CustomBottomSheet;
