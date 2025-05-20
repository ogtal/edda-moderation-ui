import { t } from "i18next";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FAQ() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t("faq-page")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
