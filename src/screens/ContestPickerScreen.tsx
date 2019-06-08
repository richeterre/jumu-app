import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { FlatList, Text, StyleSheet } from "react-native";
import ContestRow from "../components/ContestRow";
import { NavigationScreenProps } from "react-navigation";
import Divider from "../components/Divider";

export interface Contest {
  id: string;
  name: string;
  countryCode: string;
  dates: string[];
  stages: Stage[];
}

export interface Stage {
  id: string;
  name: string;
}

const CONTEST_PICKER_QUERY = gql`
  {
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

class ContestPickerQuery extends Query<{ contests: Contest[] }> {}

const ContestPickerScreen: React.FC<Props> = props => {
  return (
    <ContestPickerQuery query={CONTEST_PICKER_QUERY}>
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
    </ContestPickerQuery>
  );
};

const styles = StyleSheet.create({});

export default ContestPickerScreen;
