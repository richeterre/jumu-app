import { gql } from "apollo-boost";
import React from "react";
import { FlatList } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import ErrorView from "../components/ErrorView";
import LoadingView from "../components/LoadingView";
import ResultRow from "../components/ResultRow";
import { ResultListAppearance } from "../graphql/documents/fragments";
import { useResultListQuery } from "../graphql/types/generated";

gql`
  query ResultList($contestId: ID!, $contestCategoryId: ID!) {
    performances(
      contestId: $contestId
      filter: { contestCategoryId: $contestCategoryId, resultsPublic: true }
    ) {
      id
      appearances {
        ...ResultListAppearance
      }
    }
  }
  ${ResultListAppearance}
`;

interface NavParams {
  contestId: string;
  contestCategoryId: string;
}

const ResultListScreen: NavigationStackScreenComponent<NavParams> = ({
  navigation,
}) => {
  const contestId = navigation.getParam("contestId");
  const contestCategoryId = navigation.getParam("contestCategoryId");

  const { data, error, loading } = useResultListQuery({
    variables: { contestId, contestCategoryId },
  });

  if (error) {
    return <ErrorView />;
  } else if (loading) {
    return <LoadingView />;
  } else if (data) {
    return (
      <FlatList
        data={data.performances}
        renderItem={({ item }) => <ResultRow appearances={item.appearances} />}
      />
    );
  }
  return null;
};

export default ResultListScreen;
