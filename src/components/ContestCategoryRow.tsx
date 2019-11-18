import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  name: string;
  publicResultCount: number;
  onPress: () => void;
}

const ContestCategoryRow: React.FC<Props> = props => {
  const { name, publicResultCount, onPress } = props;

  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Text>{name}</Text>
      <Text>{publicResultCount}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
});

export default ContestCategoryRow;
