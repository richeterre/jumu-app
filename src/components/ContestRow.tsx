import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { flag } from "../helpers/countries";

interface Props {
  name: string;
  countryCode: string;
  onPress: () => void;
}

const ContestRow: React.FC<Props> = ({ name, countryCode, onPress }) => (
  <TouchableOpacity style={styles.root} onPress={onPress}>
    <Text>{`${flag(countryCode)} ${name}`}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    padding: 15
  }
});

export default ContestRow;
