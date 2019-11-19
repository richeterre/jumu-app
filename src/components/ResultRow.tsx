import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ResultListAppearanceFragment as Appearance } from "../graphql/types/generated";
import Badge from "./Badge";

interface Props {
  appearances: Appearance[];
}

const ResultRow: React.FC<Props> = props => {
  const { appearances } = props;

  const renderAppearance = (appearance: Appearance) => {
    const { id, participantName, instrumentName, result } = appearance;

    return (
      <View key={id} style={styles.appearance}>
        <Text style={styles.participantInfo}>
          {`${participantName}, ${instrumentName}`}
        </Text>

        <Text style={styles.points}>{result?.points}</Text>

        <View style={styles.prizeContainer}>
          <Text>{result?.prize}</Text>
          {result?.advances && (
            <Badge style={styles.advancementBadge} text="WL" />
          )}
        </View>
      </View>
    );
  };

  return <View style={styles.root}>{appearances.map(renderAppearance)}</View>;
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  appearance: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  participantInfo: {
    flex: 1,
  },
  points: {
    width: 32,
    marginLeft: 8,
  },
  prizeContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    width: 80,
  },
  advancementBadge: {
    marginLeft: 4,
  },
});

export default ResultRow;
