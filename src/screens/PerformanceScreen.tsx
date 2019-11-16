import { gql } from "apollo-boost";
import { partition } from "lodash";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import Divider from "../components/Divider";
import {
  PerformanceQueryAppearance,
  PerformanceQueryPiece,
} from "../graphql/documents/fragments";
import {
  PerformanceQueryAppearanceFragment,
  PerformanceQueryPieceFragment,
  usePerformanceScreenQuery,
} from "../graphql/types/generated";

gql`
  query PerformanceScreen($id: ID!) {
    performance(id: $id) {
      id
      stageDate
      stageTime
      categoryName
      ageGroup
      appearances {
        ...PerformanceQueryAppearance
      }
      pieces {
        ...PerformanceQueryPiece
      }
    }
  }
  ${PerformanceQueryAppearance}
  ${PerformanceQueryPiece}
`;

interface NavParams {
  id: string;
}

const PerformanceScreen: NavigationStackScreenComponent<NavParams> = props => {
  const { navigation } = props;
  const id = navigation.getParam("id");

  const { data } = usePerformanceScreenQuery({
    variables: { id },
  });

  if (!data?.performance) return null;

  const renderAppearance = (appearance: PerformanceQueryAppearanceFragment) => {
    const { id, participantName, instrumentName } = appearance;

    return <Text key={id}>{`${participantName}, ${instrumentName}`}</Text>;
  };

  const renderPiece = (piece: PerformanceQueryPieceFragment) => {
    const { id, personInfo, title } = piece;

    return (
      <View key={id} style={styles.piece}>
        <Text style={styles.piecePersonInfo}>{personInfo}</Text>
        <Text>{title}</Text>
      </View>
    );
  };

  const {
    categoryName,
    ageGroup,
    stageDate,
    stageTime,
    appearances,
    pieces,
  } = data.performance;

  const [acc, nonAcc] = partition(appearances, a => a.isAccompanist);

  return (
    <ScrollView style={styles.root}>
      <Text>{categoryName}</Text>
      <Text>Altersgruppe {ageGroup}</Text>
      <Text>{stageDate}</Text>
      <Text>{stageTime}</Text>

      <Divider style={styles.divider} />

      {nonAcc.map(renderAppearance)}

      {!!acc.length && (
        <Text style={styles.accompanistIntro}>begleitet von</Text>
      )}
      {acc.map(renderAppearance)}

      <Divider style={styles.divider} />

      {pieces.map(renderPiece)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  divider: {
    alignSelf: "center",
    marginVertical: 16,
    width: "67%",
  },
  accompanistIntro: {
    color: "gray",
    marginTop: 8,
  },
  piece: {
    marginBottom: 8,
  },
  piecePersonInfo: {
    fontWeight: "bold",
  },
});

export default PerformanceScreen;
