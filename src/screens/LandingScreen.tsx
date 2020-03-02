import { RouteProp } from "@react-navigation/native";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import BorderedButton from "../components/BorderedButton";
import ContestRow from "../components/ContestRow";
import colors from "../constants/colors";
import spacings from "../constants/spacings";
import textStyles from "../constants/textStyles";
import { ListContest } from "../graphql/documents/fragments";
import { useLandingQuery } from "../graphql/types/generated";
import { LandingStackParamList } from "../navigation/LandingNavigator";
import ContestPickerModal from "./ContestPickerModal";

gql`
  query Landing {
    contests: featuredContests(limit: 4) {
      ...ListContest
    }
  }
  ${ListContest}
`;

interface Props {
  route: RouteProp<LandingStackParamList, "Landing">;
}

const LandingScreen: React.FC<Props> = ({ route }) => {
  const { onSelectContest } = route.params;

  const [contestPickerVisible, setContestPickerVisible] = useState(false);
  const { data, error, loading } = useLandingQuery();

  const renderContests = () => {
    if (error) {
      return (
        <Text style={styles.statusText}>
          Die Wettbewerbe konnten leider nicht geladen werden. 😕
        </Text>
      );
    } else if (loading) {
      return <ActivityIndicator style={styles.spinner} />;
    } else if (data) {
      return data.contests.length ? (
        data.contests.map(contest => (
          <ContestRow
            key={contest.id}
            contest={contest}
            onPress={() => onSelectContest(contest)}
          />
        ))
      ) : (
        <Text style={styles.statusText}>Derzeit laufen keine Wettbewerbe.</Text>
      );
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.heading}>Herzlich willkommen!</Text>
        <Text style={styles.subheading}>
          Bitte wähle zuerst einen Wettbewerb.
        </Text>

        <Text style={styles.contestsHeading}>Aktuelle Wettbewerbe:</Text>

        <View style={styles.contestsContainer}>{renderContests()}</View>

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
    padding: spacings.extraLarge,
  },
  heading: {
    ...textStyles.extraLarge,
  },
  subheading: {
    ...textStyles.large,
    marginTop: spacings.small,
  },
  contestsHeading: {
    ...textStyles.large,
    color: colors.midGray,
    marginTop: spacings.extraLarge,
  },
  contestsContainer: {
    marginTop: spacings.small,
    marginBottom: spacings.large,
  },
  statusText: {
    ...textStyles.medium,
    color: colors.midGray,
    paddingVertical: spacings.large,
  },
  spinner: {
    marginVertical: spacings.medium,
  },
});

export default LandingScreen;
