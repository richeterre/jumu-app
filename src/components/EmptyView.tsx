import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  text: string;
}

const EmptyView: React.FC<Props> = ({ text }) => (
  <View style={styles.root}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "gray",
    textAlign: "center",
  },
});

export default EmptyView;