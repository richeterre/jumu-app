import React from "react";
import { Text, StyleSheet } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { partition } from "lodash";
import { gql } from "apollo-boost";
import {
  usePerformanceScreenQuery,
  PerformanceQueryAppearanceFragment,
} from "../graphql/types/generated";
import { PerformanceQueryAppearance } from "../graphql/documents/fragments";
import Divider from "../components/Divider";

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
    }
  }
  ${PerformanceQueryAppearance}
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

  const {
    categoryName,
    ageGroup,
    stageDate,
    stageTime,
    appearances,
  } = data.performance;

  const [acc, nonAcc] = partition(appearances, a => a.isAccompanist);

  return (
    <>
      <Text>{categoryName}</Text>
      <Text>Altersgruppe {ageGroup}</Text>
      <Text>{stageDate}</Text>
      <Text>{stageTime}</Text>

      <Divider />

      {nonAcc.map(renderAppearance)}

      {!!acc.length && (
        <Text style={styles.accompanistIntro}>begleitet von</Text>
      )}
      {acc.map(renderAppearance)}
    </>
  );
};

const styles = StyleSheet.create({
  accompanistIntro: {
    color: "gray",
    marginTop: 8,
  },
});

export default PerformanceScreen;
