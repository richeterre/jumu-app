import { gql } from "apollo-boost";
import React from "react";
import { FlatList } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import ContestCategoryRow from "../components/ContestCategoryRow";
import Divider from "../components/Divider";
import ErrorView from "../components/ErrorView";
import LoadingView from "../components/LoadingView";
import {
  Contest,
  useContestCategoryListScreenQuery,
} from "../graphql/types/generated";

gql`
  query ContestCategoryListScreen($contestId: ID!) {
    contestCategories(contestId: $contestId) {
      id
      name
      publicResultCount
    }
  }
`;

interface NavParams {
  contest: Contest;
}

const ContestCategoryListScreen: NavigationStackScreenComponent<NavParams> = props => {
  const { navigation } = props;
  const { id: contestId } = navigation.getParam("contest");

  const { data, error, loading } = useContestCategoryListScreenQuery({
    variables: { contestId },
  });

  if (error) {
    return <ErrorView />;
  } else if (loading) {
    return <LoadingView />;
  } else if (data) {
    return (
      <FlatList
        data={data.contestCategories}
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
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Divider}
      />
    );
  }
  return null;
};

export default ContestCategoryListScreen;
