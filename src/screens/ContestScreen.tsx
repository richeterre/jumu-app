import { gql } from "apollo-boost";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import Divider from "../components/Divider";
import ErrorView from "../components/ErrorView";
import LoadingView from "../components/LoadingView";
import OptionPicker from "../components/OptionPicker";
import PerformanceRow from "../components/PerformanceRow";
import { ContestQueryAppearance } from "../graphql/documents/fragments";
import { Contest, useContestScreenQuery } from "../graphql/types/generated";

gql`
  query ContestScreen($contestId: ID!, $filter: PerformanceFilter) {
    performances(contestId: $contestId, filter: $filter) {
      id
      stageTime
      categoryName
      ageGroup
      appearances {
        ...ContestQueryAppearance
      }
    }
  }
  ${ContestQueryAppearance}
`;

interface NavParams {
  contest: Contest;
}

const ContestScreen: NavigationStackScreenComponent<NavParams> = props => {
  const { navigation } = props;
  const { id, dates, stages } = navigation.getParam("contest");

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedStage, setSelectedStage] = useState(stages[0]);

  const { data, error, loading } = useContestScreenQuery({
    variables: {
      contestId: id,
      filter: { stageDate: selectedDate, stageId: selectedStage.id },
    },
  });

  const renderPerformanceList = () => {
    if (error) {
      return <ErrorView />;
    } else if (loading) {
      return <LoadingView />;
    } else if (data) {
      return (
        <FlatList
          style={styles.performanceList}
          data={data.performances}
          renderItem={({ item }) => (
            <PerformanceRow
              stageTime={item.stageTime}
              categoryInfo={`${item.categoryName}, AG ${item.ageGroup}`}
              appearances={item.appearances}
              onPress={() =>
                navigation.navigate("Performance", {
                  id: item.id,
                  stage: selectedStage,
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

  return (
    <>
      <OptionPicker
        style={styles.optionPicker}
        options={dates}
        formatOption={date => date}
        selectedOption={selectedDate}
        onSelectOption={setSelectedDate}
      />
      <OptionPicker
        style={styles.optionPicker}
        options={stages}
        formatOption={stage => stage.name}
        selectedOption={selectedStage}
        onSelectOption={setSelectedStage}
      />
      <View style={styles.performanceListContainer}>
        {renderPerformanceList()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  optionPicker: {
    marginTop: 15,
  },
  performanceListContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  performanceList: {
    alignSelf: "stretch",
  },
});

export default ContestScreen;
