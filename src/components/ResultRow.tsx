import React from "react";
import { StyleSheet, Text, View } from "react-native";

import spacings from "../constants/spacings";
import textStyles from "../constants/textStyles";
import {
  PredecessorHostFragment,
  ResultListAppearanceFragment as Appearance,
} from "../graphql/types/generated";
import { formatHost } from "../helpers/hosts";
import { adaptive } from "../helpers/layout";
import Badge from "./Badge";

interface Props {
  appearances: Appearance[];
  predecessorHost: PredecessorHostFragment | null;
}

const ResultRow: React.FC<Props> = props => {
  const { appearances, predecessorHost } = props;

  const renderAppearance = (appearance: Appearance) => {
    const { id, participantName, instrumentName, result } = appearance;

    return (
      <View key={id} style={styles.appearance}>
        <Text style={styles.participantInfo}>
          {`${participantName}, ${instrumentName}`}
        </Text>

        <Text style={styles.points}>{result?.points}</Text>

        <View style={styles.prizeContainer}>
          <Text style={styles.prize}>{result?.prize}</Text>
          {result?.advances && (
            <Badge style={styles.advancementBadge} text="WL" />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {appearances.map(renderAppearance)}
      {predecessorHost && (
        <Text style={styles.predecessorHostInfo}>
          {formatHost(predecessorHost)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: spacings.large,
    paddingVertical: spacings.small,
  },
  appearance: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  participantInfo: {
    ...textStyles.medium,
    flex: 1,
  },
  points: {
    ...textStyles.medium,
    width: adaptive(32, 28),
    marginLeft: 8,
  },
  prizeContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    width: adaptive(80, 76),
  },
  prize: {
    ...textStyles.medium,
  },
  advancementBadge: {
    marginLeft: 4,
  },
  predecessorHostInfo: {
    ...textStyles.medium,
  },
});

export default ResultRow;
