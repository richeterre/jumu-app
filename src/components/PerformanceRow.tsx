import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import textStyles from "../constants/textStyles";
import { ListPerformanceFragment } from "../graphql/types/generated";
import { flags } from "../helpers/countries";
import { isoTimeToString } from "../helpers/dates";

interface Props {
  performance: ListPerformanceFragment;
  onPress: () => void;
}

const PerformanceRow: React.FC<Props> = props => {
  const {
    performance: {
      stageTime,
      categoryName,
      ageGroup,
      appearances,
      predecessorHost,
    },
    onPress,
  } = props;

  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Text style={styles.stageTime}>{isoTimeToString(stageTime)}</Text>

      <View style={styles.container}>
        <Text style={styles.categoryInfo}>
          {`${categoryName}, AG ${ageGroup}`}
        </Text>
        <Text style={styles.appearances}>
          {appearances
            .map(a => `${a.participantName}, ${a.instrumentName}`)
            .join("\n")}
        </Text>
        {predecessorHost && (
          <Text style={styles.predecessorHostInfo}>
            {flags(predecessorHost.countryCodes)} {predecessorHost.name}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  stageTime: {
    ...textStyles.medium,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    marginLeft: 16,
  },
  categoryInfo: {
    ...textStyles.medium,
    fontWeight: "bold",
  },
  appearances: {
    ...textStyles.medium,
    marginTop: 8,
  },
  predecessorHostInfo: {
    ...textStyles.medium,
    marginTop: 3,
  },
});

export default PerformanceRow;
