import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import colors from "../constants/colors";
import spacings from "../constants/spacings";

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
    marginLeft: spacings.large,
  },
});

export default Divider;
