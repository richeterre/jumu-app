import { gql } from "apollo-boost";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import Divider from "../components/Divider";
import EmptyView from "../components/EmptyView";
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
        contentContainerStyle={styles.resultListContainer}
        data={data.performances}
        ItemSeparatorComponent={Divider}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <EmptyView text="In dieser Kategorie wurden noch keine Ergebnisse veröffentlicht." />
        }
        renderItem={({ item }) => <ResultRow appearances={item.appearances} />}
      />
    );
  }
  return null;
};

const styles = StyleSheet.create({
  resultListContainer: {
    flexGrow: 1,
    paddingVertical: 8,
  },
});

export default ResultListScreen;
