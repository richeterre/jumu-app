import React from "react";
import { gql } from "apollo-boost";
import { FlatList, Text, StyleSheet } from "react-native";
import ContestRow from "../components/ContestRow";
import { NavigationScreenProps } from "react-navigation";
import Divider from "../components/Divider";
import { ContestPickerComponent } from "../graphql/types/generated";

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

interface Props extends NavigationScreenProps {}

const ContestPickerScreen: React.FC<Props> = props => {
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
            />
          );
        }
        return null;
      }}
    </ContestPickerComponent>
  );
};

const styles = StyleSheet.create({});

export default ContestPickerScreen;
