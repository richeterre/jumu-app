import { RouteProp } from "@react-navigation/native";
import { gql } from "apollo-boost";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import Divider from "../components/Divider";
import EmptyView from "../components/EmptyView";
import ErrorView from "../components/ErrorView";
import LoadingView from "../components/LoadingView";
import ResultRow from "../components/ResultRow";
import {
  PredecessorHost,
  ResultListAppearance,
} from "../graphql/documents/fragments";
import { useResultListQuery } from "../graphql/types/generated";
import { ResultsStackParamList } from "../navigation/ContestNavigator";

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
      predecessorHost {
        ...PredecessorHost
      }
    }
  }
  ${ResultListAppearance}
  ${PredecessorHost}
`;

interface Props {
  route: RouteProp<ResultsStackParamList, "ResultList">;
}

const ResultListScreen: React.FC<Props> = ({ route }) => {
  const { contestId, contestCategoryId } = route.params;

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
          <EmptyView text="In dieser Kategorie wurden bisher keine Ergebnisse veröffentlicht." />
        }
        renderItem={({ item }) => (
          <ResultRow
            appearances={item.appearances}
            predecessorHost={item.predecessorHost}
          />
        )}
      />
    );
  }
  return null;
};

const styles = StyleSheet.create({
  resultListContainer: {
    flexGrow: 1,
    paddingVertical: 4,
  },
});

export default ResultListScreen;
