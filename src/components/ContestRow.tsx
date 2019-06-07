import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { flag } from "../helpers/countries";

interface Props {
  name: string;
  countryCode: string;
  onPress: () => void;
}

const ContestRow: React.FC<Props> = props => {
  return (
    <TouchableOpacity style={styles.root} onPress={props.onPress}>
      <Text>
        {flag(props.countryCode)} {props.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 15
  }
});

export default ContestRow;
