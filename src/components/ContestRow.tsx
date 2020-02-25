import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import textStyles from "../constants/textStyles";
import { ListContestFragment } from "../graphql/types/generated";
import { flags } from "../helpers/countries";

interface Props {
  contest: ListContestFragment;
  onPress: () => void;
}

const ContestRow: React.FC<Props> = ({ contest, onPress }) => (
  <TouchableOpacity style={styles.root} onPress={onPress}>
    <Text style={styles.name}>
      {`${flags(contest.host.countryCodes)} ${contest.name}`}
    </Text>
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
