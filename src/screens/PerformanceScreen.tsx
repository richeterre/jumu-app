import { gql } from "apollo-boost";
import { partition } from "lodash";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import Divider from "../components/Divider";
import {
  PerformanceAppearance,
  PerformancePiece,
} from "../graphql/documents/fragments";
import {
  PerformanceAppearanceFragment,
  PerformancePieceFragment,
  Stage,
  usePerformanceQuery,
} from "../graphql/types/generated";

gql`
  query Performance($id: ID!) {
    performance(id: $id) {
      id
      stageDate
      stageTime
      categoryName
      ageGroup
      appearances {
        ...PerformanceAppearance
      }
      pieces {
        ...PerformancePiece
      }
    }
  }
  ${PerformanceAppearance}
  ${PerformancePiece}
`;

interface NavParams {
  id: string;
  stage: Stage;
}

const PerformanceScreen: NavigationStackScreenComponent<NavParams> = props => {
  const { navigation } = props;
  const id = navigation.getParam("id");
  const stage = navigation.getParam("stage");

  const { data } = usePerformanceQuery({
    variables: { id },
  });

  if (!data?.performance) return null;

  const renderAppearance = (appearance: PerformanceAppearanceFragment) => {
    const { id, participantName, instrumentName } = appearance;

    return <Text key={id}>{`${participantName}, ${instrumentName}`}</Text>;
  };

  const renderPiece = (piece: PerformancePieceFragment) => {
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
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      alwaysBounceVertical={false}
    >
      <Text>{categoryName}</Text>
      <Text>Altersgruppe {ageGroup}</Text>
      <Text>{stageDate}</Text>
      <Text>{stageTime}</Text>
      <Text>{stage.name}</Text>

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
  scrollViewContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  divider: {
    alignSelf: "center",
    marginVertical: 16,
    marginLeft: 0,
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
