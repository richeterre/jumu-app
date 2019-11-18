import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ErrorView: React.FC = () => (
  <View style={styles.root}>
    <Text style={styles.heading}>Oh je!</Text>
    <Text style={styles.body}>
      Leider ist ein Fehler passiert. Bitte prüfe, ob du die neueste Version der
      App installiert hast.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "bold",
  },
  body: {
    marginTop: 8,
    textAlign: "center",
  },
});

export default ErrorView;
