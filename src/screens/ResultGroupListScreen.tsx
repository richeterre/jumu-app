import { gql, NetworkStatus } from "@apollo/client";
import {
  NavigationProp,
  RouteProp,
  useScrollToTop,
} from "@react-navigation/native";
import React, { useRef } from "react";
import { FlatList } from "react-native";

import ContestCategoryRow from "../components/ContestCategoryRow";
import Divider from "../components/Divider";
import ErrorView from "../components/ErrorView";
import LoadingView from "../components/LoadingView";
import { useResultGroupListQuery } from "../graphql/types/generated";
import { ResultsStackParamList } from "../navigation/ContestNavigator";

gql`
  query ResultGroupList($contestId: ID!) {
    contestCategories(contestId: $contestId) {
      id
      name
      publicResultCount
    }
  }
`;

interface Props {
  navigation: NavigationProp<ResultsStackParamList, "ResultGroupList">;
  route: RouteProp<ResultsStackParamList, "ResultGroupList">;
}

const ResultGroupListScreen: React.FC<Props> = props => {
  const { navigation, route } = props;
  const { id: contestId } = route.params.contest;

  const resultGroupListRef = useRef(null);
  useScrollToTop(resultGroupListRef);

  const { data, error, networkStatus, refetch } = useResultGroupListQuery({
    variables: { contestId },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    return <ErrorView />;
  } else if (networkStatus === NetworkStatus.loading) {
    return <LoadingView />;
  } else if (data) {
    return (
      <FlatList
        ref={resultGroupListRef}
        data={data.contestCategories}
        ItemSeparatorComponent={Divider}
        keyExtractor={item => item.id}
        refreshing={networkStatus === NetworkStatus.refetch}
        renderItem={({ item }) => (
          <ContestCategoryRow
            name={item.name}
            publicResultCount={item.publicResultCount}
            onPress={() =>
              navigation.navigate("ResultList", {
                contestId,
                contestCategoryId: item.id,
              })
            }
          />
        )}
        onRefresh={refetch}
      />
    );
  }
  return null;
};

export default ResultGroupListScreen;
