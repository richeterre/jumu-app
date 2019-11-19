import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import textStyles from "../constants/textStyles";
import { flag } from "../helpers/countries";

interface Props {
  name: string;
  countryCode: string;
  onPress: () => void;
}

const ContestRow: React.FC<Props> = ({ name, countryCode, onPress }) => (
  <TouchableOpacity style={styles.root} onPress={onPress}>
    <Text style={styles.name}>{`${flag(countryCode)} ${name}`}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  name: {
    ...textStyles.large,
  },
});

export default ContestRow;
