import { gql } from "apollo-boost";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

import {
  ListContestFragment as Contest,
  LandingScreenQueryComponent
} from "../graphql/types/generated";
import { ListContest } from "../graphql/documents/fragments";
import ContestRow from "../components/ContestRow";

gql`
  query LandingScreenQuery {
    contests {
      ...ListContest
    }
  }
  ${ListContest}
`;

interface Props {
  onSelectContest: (contest: Contest) => void;
}

const LandingScreen: React.FC<Props> = props => {
  return (
    <View style={styles.root}>
      <Text>Herzlich willkommen!</Text>
      <Text>Bitte wähle einen Wettbewerb:</Text>
      <LandingScreenQueryComponent>
        {result => {
          if (result.error) {
            return <Text>Error!</Text>;
          } else if (result.loading) {
            return <Text>Loading...</Text>;
          } else if (result.data) {
            const [firstContest] = result.data.contests;
            return firstContest ? (
              <ContestRow
                name={firstContest.name}
                countryCode={firstContest.countryCode}
                onPress={() => props.onSelectContest(firstContest)}
              />
            ) : (
              <Text>No contests found!</Text>
            );
          }
        }}
      </LandingScreenQueryComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center"
  }
});

export default LandingScreen;
