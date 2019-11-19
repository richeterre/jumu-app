import { gql } from "apollo-boost";
import { partition } from "lodash";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import Divider from "../components/Divider";
import colors from "../constants/colors";
import textStyles from "../constants/textStyles";
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

  const {
    categoryName,
    ageGroup,
    stageDate,
    stageTime,
    appearances,
    pieces,
  } = data.performance;

  const renderAppearance = (appearance: PerformanceAppearanceFragment) => {
    const { id, participantName, instrumentName, isAccompanist } = appearance;

    // Append age group info for divergent age groups
    const ageGroupInfo =
      appearance.ageGroup !== ageGroup ? ` (AG ${appearance.ageGroup})` : "";

    const roleStyle = isAccompanist && styles.accompanistAppearance;

    return (
      <Text key={id} style={[styles.appearance, roleStyle]}>
        {`${participantName}, ${instrumentName}${ageGroupInfo}`}
      </Text>
    );
  };

  const renderPiece = (piece: PerformancePieceFragment) => {
    const { id, personInfo, title } = piece;

    return (
      <View key={id} style={styles.piece}>
        <Text style={styles.piecePersonInfo}>{personInfo}</Text>
        <Text style={styles.pieceTitle}>{title}</Text>
      </View>
    );
  };

  const [acc, nonAcc] = partition(appearances, a => a.isAccompanist);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      alwaysBounceVertical={false}
    >
      <Text style={styles.categoryName}>{categoryName}</Text>
      <Text style={styles.ageGroup}>Altersgruppe {ageGroup}</Text>
      <Text style={styles.stageDate}>{stageDate}</Text>
      <Text style={styles.stageTime}>{stageTime}</Text>
      <Text style={styles.stageName}>{stage.name}</Text>

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
  categoryName: {
    ...textStyles.large,
    fontWeight: "bold",
  },
  ageGroup: {
    ...textStyles.large,
  },
  stageDate: {
    ...textStyles.medium,
    marginTop: 16,
  },
  stageTime: {
    ...textStyles.medium,
  },
  stageName: {
    ...textStyles.medium,
  },
  divider: {
    alignSelf: "center",
    marginVertical: 16,
    marginLeft: 0,
    width: "67%",
  },
  appearance: {
    ...textStyles.medium,
    fontWeight: "bold",
  },
  accompanistAppearance: {
    fontWeight: "normal",
  },
  accompanistIntro: {
    ...textStyles.small,
    color: colors.mutedText,
    marginTop: 8,
  },
  piece: {
    marginBottom: 8,
  },
  piecePersonInfo: {
    ...textStyles.medium,
    fontWeight: "bold",
  },
  pieceTitle: {
    ...textStyles.medium,
  },
});

export default PerformanceScreen;
