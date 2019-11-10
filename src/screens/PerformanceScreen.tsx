import React from "react";
import { Text } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { gql } from "apollo-boost";
import { usePerformanceScreenQuery } from "../graphql/types/generated";

gql`
  query PerformanceScreen($id: ID!) {
    performance(id: $id) {
      id
      stageDate
      stageTime
      categoryName
      ageGroup
    }
  }
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

  return (
    <>
      <Text>{data.performance.categoryName}</Text>
      <Text>Altersgruppe {data.performance.ageGroup}</Text>
      <Text>{data.performance.stageDate}</Text>
      <Text>{data.performance.stageTime}</Text>
    </>
  );
};

export default PerformanceScreen;
