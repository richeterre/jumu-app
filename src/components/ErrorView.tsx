import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../constants/colors";
import textStyles from "../constants/textStyles";

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
    ...textStyles.large,
    color: colors.mutedText,
    fontWeight: "bold",
  },
  body: {
    ...textStyles.large,
    color: colors.mutedText,
    marginTop: 8,
    textAlign: "center",
  },
});

export default ErrorView;
