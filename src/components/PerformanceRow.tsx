import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ContestQueryAppearanceFragment } from "../graphql/types/generated";
import { isoTimeToString } from "../helpers/dates";

interface Props {
  stageTime: string;
  categoryInfo: string;
  appearances: ContestQueryAppearanceFragment[];
}

const PerformanceRow: React.FC<Props> = props => {
  const { stageTime, categoryInfo, appearances } = props;

  return (
    <View style={styles.root}>
      <Text style={styles.stageTime}>{isoTimeToString(stageTime)}</Text>

      <View style={styles.container}>
        <Text style={styles.categoryInfo}>{categoryInfo}</Text>
        <Text>
          {appearances
            .map(a => `${a.participantName}, ${a.instrumentName}`)
            .join("\n")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    padding: 20
  },
  stageTime: {
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    marginLeft: 15
  },
  categoryInfo: {
    fontWeight: "bold"
  }
});

export default PerformanceRow;
