import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [presCount, setPressCount] = useState(0);

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <Text>You're pressed the button: {presCount} time(s)</Text>
      <Button title="Press me" onPress={() => setPressCount(presCount + 1)}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
