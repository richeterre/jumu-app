import { gql } from "apollo-boost";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import BorderedButton from "../components/BorderedButton";
import ContestRow from "../components/ContestRow";
import colors from "../constants/colors";
import textStyles from "../constants/textStyles";
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

interface NavParams {
  onSelectContest: (contest: Contest) => void;
}

const LandingScreen: NavigationStackScreenComponent<NavParams> = ({
  navigation,
}) => {
  const [contestPickerVisible, setContestPickerVisible] = useState(false);
  const { data, error, loading } = useLandingQuery();

  const onSelectContest = navigation.getParam("onSelectContest");

  const renderContests = () => {
    if (error) {
      return <Text>Fehler</Text>;
    } else if (loading) {
      return <Text>Lade Wettbewerbe…</Text>;
    } else if (data) {
      const [firstContest] = data.contests;
      return firstContest ? (
        <ContestRow
          countryCode={firstContest.countryCode}
          name={firstContest.name}
          onPress={() => onSelectContest(firstContest)}
        />
      ) : (
        <Text>No contests found!</Text>
      );
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.heading}>Herzlich willkommen!</Text>
        <Text style={styles.subheading}>Bitte wähle einen Wettbewerb:</Text>

        {renderContests()}

        <BorderedButton
          title="Weitere Wettbewerbe…"
          onPress={() => setContestPickerVisible(true)}
        />

        <ContestPickerModal
          visible={contestPickerVisible}
          onCancel={() => setContestPickerVisible(false)}
          onSelectContest={contest => {
            setContestPickerVisible(false);
            onSelectContest(contest);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    padding: 16,
  },
  heading: {
    ...textStyles.extraLarge,
  },
  subheading: {
    ...textStyles.large,
    color: colors.mutedText,
    marginTop: 8,
  },
});

export default LandingScreen;
