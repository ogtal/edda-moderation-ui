import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Privacy() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Privacy Policy</Text>
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
