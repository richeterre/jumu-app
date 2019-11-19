import { gql } from "apollo-boost";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import ContestRow from "../components/ContestRow";
import { ListContest } from "../graphql/documents/fragments";
import {
  ListContestFragment as Contest,
  useLandingQuery,
} from "../graphql/types/generated";
import ContestPickerModal from "./ContestPickerModal";

gql`
  query Landing {
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
  const { data, error, loading } = useLandingQuery();

  const renderContests = () => {
    if (error) {
      return <Text>Fehler</Text>;
    } else if (loading) {
      return <Text>Lade Wettbewerbe…</Text>;
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
