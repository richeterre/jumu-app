import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import colors from "../constants/colors";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const Divider: React.FC<Props> = ({ style }) => {
  return <View style={[styles.root, style]} />;
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.separator,
    height: 1,
    marginLeft: 16,
  },
});

export default Divider;
