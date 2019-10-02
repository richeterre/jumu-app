import { gql } from "apollo-boost";
import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import {
  ListContestFragment as Contest,
  useLandingScreenQuery,
} from "../graphql/types/generated";
import { ListContest } from "../graphql/documents/fragments";
import ContestRow from "../components/ContestRow";
import ContestPickerModal from "./ContestPickerModal";

gql`
  query LandingScreen {
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
  const [contestPickerVisible, setContestPickerVisible] = useState(false);
  const { data, error, loading } = useLandingScreenQuery();

  const renderContests = () => {
    if (error) {
      return <Text>Error!</Text>;
    } else if (loading) {
      return <Text>Loading...</Text>;
    } else if (data) {
      const [firstContest] = data.contests;
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
  };

  return (
    <View style={styles.root}>
      <Text>Herzlich willkommen!</Text>
      <Text>Bitte wähle einen Wettbewerb:</Text>
      {renderContests()}
      <Button
        title="Weitere Wettbewerbe…"
        onPress={() => setContestPickerVisible(true)}
      />
      <ContestPickerModal
        visible={contestPickerVisible}
        onCancel={() => setContestPickerVisible(false)}
        onSelectContest={contest => {
          setContestPickerVisible(false);
          props.onSelectContest(contest);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
  },
});

export default LandingScreen;
