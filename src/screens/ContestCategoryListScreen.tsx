import { gql } from "apollo-boost";
import React from "react";
import { FlatList, Text } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import ContestCategoryRow from "../components/ContestCategoryRow";
import Divider from "../components/Divider";
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
  const { id } = navigation.getParam("contest");

  const { data, error, loading } = useContestCategoryListScreenQuery({
    variables: { contestId: id },
  });

  if (error) {
    return <Text>Error!</Text>;
  } else if (loading) {
    return <Text>Loading...</Text>;
  } else if (data) {
    return (
      <FlatList
        data={data.contestCategories}
        renderItem={({ item }) => (
          <ContestCategoryRow
            name={item.name}
            publicResultCount={item.publicResultCount}
            onPress={() => {}}
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
