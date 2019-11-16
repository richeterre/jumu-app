import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const Divider: React.FC<Props> = ({ style }) => {
  return <View style={[styles.root, style]} />;
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "lightgray",
    height: 1,
    marginHorizontal: 15,
  },
});

export default Divider;
