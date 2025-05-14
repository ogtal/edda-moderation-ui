import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FAQ() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FAQ Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
