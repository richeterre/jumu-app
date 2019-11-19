import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../constants/colors";
import textStyles from "../constants/textStyles";

interface Props {
  title: string;
  onPress: () => void;
}

const HeaderButton: React.FC<Props> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.root} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.triangle} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    ...textStyles.large,
    color: colors.white,
    fontWeight: "bold",
  },
  triangle: {
    marginLeft: 4,
    marginTop: 4,
    borderLeftWidth: 5,
    borderLeftColor: colors.transparent,
    borderRightWidth: 5,
    borderRightColor: colors.transparent,
    borderTopWidth: 8,
    borderTopColor: colors.white,
  },
});

export default HeaderButton;
