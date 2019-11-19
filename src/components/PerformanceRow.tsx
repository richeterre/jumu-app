import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { PerformanceListAppearanceFragment } from "../graphql/types/generated";
import { isoTimeToString } from "../helpers/dates";

interface Props {
  stageTime: string;
  categoryInfo: string;
  appearances: PerformanceListAppearanceFragment[];
  onPress: () => void;
}

const PerformanceRow: React.FC<Props> = props => {
  const { stageTime, categoryInfo, appearances, onPress } = props;

  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Text style={styles.stageTime}>{isoTimeToString(stageTime)}</Text>

      <View style={styles.container}>
        <Text style={styles.categoryInfo}>{categoryInfo}</Text>
        <Text>
          {appearances
            .map(a => `${a.participantName}, ${a.instrumentName}`)
            .join("\n")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    padding: 16,
  },
  stageTime: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    marginLeft: 15,
  },
  categoryInfo: {
    fontWeight: "bold",
  },
});

export default PerformanceRow;
