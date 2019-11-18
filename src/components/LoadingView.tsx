import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const LoadingView: React.FC = () => (
  <View style={styles.root}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingView;
