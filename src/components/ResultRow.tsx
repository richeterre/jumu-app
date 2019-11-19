import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ResultListQueryAppearanceFragment as Appearance } from "../graphql/types/generated";

interface Props {
  appearances: Appearance[];
}

const ResultRow: React.FC<Props> = props => {
  const { appearances } = props;

  const renderAppearance = (appearance: Appearance) => {
    const { id, participantName, instrumentName, result } = appearance;

    return (
      <View key={id} style={styles.appearance}>
        <Text>{`${participantName}, ${instrumentName}`}</Text>
        <Text>{result?.points}</Text>
      </View>
    );
  };

  return <View style={styles.root}>{appearances.map(renderAppearance)}</View>;
};

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  appearance: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ResultRow;
