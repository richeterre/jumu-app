import React, { useState } from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import { NavigationScreenComponent, ScreenProps } from "react-navigation";
import { gql } from "apollo-boost";
import PerformanceRow from "../components/PerformanceRow";
import Divider from "../components/Divider";
import OptionPicker from "../components/OptionPicker";
import { Contest, ContestQueryComponent } from "../graphql/types/generated";
import SafeAreaListFooter from "../components/SafeAreaListFooter";
import { ContestQueryAppearance } from "../graphql/documents/fragments";

gql`
  query ContestQuery($contestId: ID!, $filter: PerformanceFilter) {
    performances(contestId: $contestId, filter: $filter) {
      id
      stageTime
      categoryInfo
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

const ContestScreen: NavigationScreenComponent<NavParams> = props => {
  const { id, dates, stages } = props.navigation.getParam("contest");

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedStage, setSelectedStage] = useState(stages[0]);

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
      <ContestQueryComponent
        variables={{
          contestId: id,
          filter: {
            stageDate: selectedDate,
            stageId: selectedStage.id
          }
        }}
      >
        {result => {
          if (result.error) {
            return <Text>Error!</Text>;
          } else if (result.loading) {
            return <Text>Loading...</Text>;
          } else if (result.data) {
            return (
              <FlatList
                data={result.data.performances}
                renderItem={({ item }) => (
                  <PerformanceRow
                    stageTime={item.stageTime}
                    categoryInfo={item.categoryInfo}
                    appearances={item.appearances}
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
      </ContestQueryComponent>
    </>
  );
};

ContestScreen.navigationOptions = (screenProps: ScreenProps) => ({
  title: screenProps.navigation.getParam("contest").name
});

const styles = StyleSheet.create({
  optionPicker: {
    marginTop: 15
  }
});

export default ContestScreen;
