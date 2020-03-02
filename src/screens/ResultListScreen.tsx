import { gql, NetworkStatus } from "@apollo/client";
import { RouteProp } from "@react-navigation/native";
import { groupBy, keys } from "lodash";
import React from "react";
import { SectionList, StyleSheet, Text } from "react-native";

import Divider from "../components/Divider";
import EmptyView from "../components/EmptyView";
import ErrorView from "../components/ErrorView";
import LoadingView from "../components/LoadingView";
import ResultRow from "../components/ResultRow";
import colors from "../constants/colors";
import spacings from "../constants/spacings";
import textStyles from "../constants/textStyles";
import {
  PredecessorHost,
  ResultListAppearance,
} from "../graphql/documents/fragments";
import {
  ResultListQuery,
  useResultListQuery,
} from "../graphql/types/generated";
import { ResultsStackParamList } from "../navigation/ContestNavigator";

gql`
  query ResultList($contestId: ID!, $contestCategoryId: ID!) {
    performances(
      contestId: $contestId
      filter: { contestCategoryId: $contestCategoryId, resultsPublic: true }
    ) {
      id
      ageGroup
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

  const { data, error, networkStatus, refetch } = useResultListQuery({
    variables: { contestId, contestCategoryId },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    return <ErrorView />;
  } else if (networkStatus === NetworkStatus.loading) {
    return <LoadingView />;
  } else if (data) {
    return (
      <SectionList
        contentContainerStyle={styles.resultListContainer}
        ItemSeparatorComponent={Divider}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <EmptyView text="In dieser Kategorie wurden bisher keine Ergebnisse veröffentlicht." />
        }
        refreshing={networkStatus === NetworkStatus.refetch}
        renderItem={({ item }) => (
          <ResultRow
            appearances={item.appearances}
            predecessorHost={item.predecessorHost}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        sections={getSections(data)}
        onRefresh={refetch}
      />
    );
  }
  return null;
};

const getSections = (data: ResultListQuery) => {
  const groupedPerformances = groupBy(data.performances, p => p.ageGroup);

  return keys(groupedPerformances)
    .sort()
    .map(ageGroup => ({
      title: `AG ${ageGroup}`,
      data: groupedPerformances[ageGroup],
    }));
};

const styles = StyleSheet.create({
  resultListContainer: {
    flexGrow: 1,
  },
  sectionHeader: {
    ...textStyles.medium,
    backgroundColor: colors.lighterGray,
    fontWeight: "bold",
    paddingHorizontal: spacings.large,
    paddingVertical: spacings.small,
  },
});

export default ResultListScreen;
