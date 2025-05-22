import colors from "@/theme/colors";
import { t } from "i18next";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

interface BaseModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function BaseModal({
  isVisible,
  onClose,
  children,
  title,
}: BaseModalProps) {
  const { height } = useWindowDimensions();
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(height);
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable
          style={styles.overlayPressable}
          onPress={onClose}
          accessibilityLabel={t("close_modal") || "Close Modal"}
          accessibilityRole="button"
        />
        <Animated.View
          style={[
            styles.modalContainer,
            { maxHeight: height * 0.5 },
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {title && (
            <View style={styles.header}>
              <Text style={styles.modalTitle}>{title}</Text>
              <Pressable
                onPress={onClose}
                style={styles.closeButton}
                accessibilityLabel={t("close_modal") || "Close Modal"}
                accessibilityRole="button"
              >
                <Text style={styles.closeButtonText}>
                  {t("close") || "Close"}
                </Text>
              </Pressable>
            </View>
          )}
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  overlayPressable: {
    flex: 1,
  },
  modalContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.surfaceLight[500],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.baseDark.DEFAULT,
  },
  modalTitle: {
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
});
