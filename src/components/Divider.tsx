import React from "react";
import { StyleSheet, View } from "react-native";

const Divider = () => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "lightgray",
    height: 1,
    marginHorizontal: 15,
  },
});

export default Divider;
