import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../constants/colors";
import textStyles from "../constants/textStyles";

interface Props {
  name: string;
  publicResultCount: number;
  onPress: () => void;
}

const ContestCategoryRow: React.FC<Props> = props => {
  const { name, publicResultCount, onPress } = props;

  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.publicResultCount}>{publicResultCount}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  name: {
    ...textStyles.medium,
  },
  publicResultCount: {
    ...textStyles.medium,
    color: colors.midGray,
  },
});

export default ContestCategoryRow;
