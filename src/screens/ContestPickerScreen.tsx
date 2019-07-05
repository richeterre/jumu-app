import React from "react";
import { gql } from "apollo-boost";
import { FlatList, Text } from "react-native";
import ContestRow from "../components/ContestRow";
import { NavigationScreenComponent } from "react-navigation";
import Divider from "../components/Divider";
import { ContestPickerComponent } from "../graphql/types/generated";
import SafeAreaListFooter from "../components/SafeAreaListFooter";

gql`
  query ContestPicker {
    contests {
      id
      name
      countryCode
      dates
      stages {
        id
        name
      }
    }
  }
`;

const ContestPickerScreen: NavigationScreenComponent = props => {
  return (
    <ContestPickerComponent>
      {result => {
        if (result.error) {
          return <Text>Error!</Text>;
        } else if (result.loading) {
          return <Text>Loading...</Text>;
        } else if (result.data) {
          return (
            <FlatList
              data={result.data.contests}
              renderItem={({ item }) => (
                <ContestRow
                  name={item.name}
                  countryCode={item.countryCode}
                  onPress={() =>
                    props.navigation.navigate("Contest", { contest: item })
                  }
                />
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={Divider}
              ListFooterComponent={SafeAreaListFooter}
            />
          );
        }
        return null;
      }}
    </ContestPickerComponent>
  );
};

export default ContestPickerScreen;
