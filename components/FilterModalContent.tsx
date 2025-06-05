import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

interface FilterModalProps {
  includeNonHateful: boolean;
  onClose: () => void;
  onToggleIncludeNonHateful: (value: boolean) => void;
}

export default function FilterModal({
  includeNonHateful,
  onClose,
  onToggleIncludeNonHateful,
}: FilterModalProps) {
  const [localIncludeNonHateful, setLocalIncludeNonHateful] =
    useState(includeNonHateful);

  useEffect(() => {
    setLocalIncludeNonHateful(includeNonHateful);
  }, [includeNonHateful]);

  const handleToggle = (value: boolean) => {
    setLocalIncludeNonHateful(value);
    onToggleIncludeNonHateful(value);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>
          {t("include_non_hateful") || "Include non-hateful content"}
        </Text>
        <Switch
          value={localIncludeNonHateful}
          onValueChange={handleToggle}
          testID="include-non-hateful-switch"
          accessibilityLabel={
            t("include_non_hateful") || "Include non-hateful content"
          }
        />
      </View>

      <Text style={styles.caption}>
        {localIncludeNonHateful
          ? t("filter_description_both") ||
            "Showing hateful and non-hateful content"
          : t("filter_description_hateful_only") ||
            "Showing only hateful content"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    paddingRight: 10,
  },
  caption: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
});
