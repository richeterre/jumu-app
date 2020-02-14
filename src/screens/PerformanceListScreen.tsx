import { RouteProp, useScrollToTop } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { gql } from "apollo-boost";
import React, { useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import Divider from "../components/Divider";
import EmptyView from "../components/EmptyView";
import ErrorView from "../components/ErrorView";
import LoadingView from "../components/LoadingView";
import OptionPicker from "../components/OptionPicker";
import PerformanceRow from "../components/PerformanceRow";
import { PerformanceListAppearance } from "../graphql/documents/fragments";
import { usePerformanceListQuery } from "../graphql/types/generated";
import { TimetableStackParamList } from "../navigation/ContestNavigator";

gql`
  query PerformanceList($contestId: ID!, $filter: PerformanceFilter) {
    performances(contestId: $contestId, filter: $filter) {
      id
      stageTime
      categoryName
      ageGroup
      appearances {
        ...PerformanceListAppearance
      }
    }
  }
  ${PerformanceListAppearance}
`;

interface Props {
  navigation: StackNavigationProp<TimetableStackParamList, "PerformanceList">;
  route: RouteProp<TimetableStackParamList, "PerformanceList">;
}

const PerformanceList: React.FC<Props> = props => {
  const { navigation, route } = props;
  const { id, dates, stages } = route.params.contest;

  const performanceListRef = useRef(null);
  useScrollToTop(performanceListRef);

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedStage, setSelectedStage] = useState(stages[0]);

  const { data, error, loading } = usePerformanceListQuery({
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
          ref={performanceListRef}
          contentContainerStyle={styles.performanceListContainer}
          data={data.performances}
          ItemSeparatorComponent={Divider}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <EmptyView text="An diesem Tag finden am ausgewählten Ort keine Vorspiele statt." />
          }
          renderItem={({ item }) => (
            <PerformanceRow
              appearances={item.appearances}
              categoryInfo={`${item.categoryName}, AG ${item.ageGroup}`}
              stageTime={item.stageTime}
              onPress={() =>
                navigation.navigate("Performance", {
                  id: item.id,
                  stage: selectedStage,
                })
              }
            />
          )}
          style={styles.performanceList}
        />
      );
    }
    return null;
  };

  return (
    <>
      <OptionPicker
        formatOption={date => date}
        options={dates}
        selectedOption={selectedDate}
        style={styles.optionPicker}
        onSelectOption={setSelectedDate}
      />
      <OptionPicker
        formatOption={stage => stage.name}
        options={stages}
        selectedOption={selectedStage}
        style={styles.optionPicker}
        onSelectOption={setSelectedStage}
      />
      {renderPerformanceList()}
    </>
  );
};

const styles = StyleSheet.create({
  optionPicker: {
    marginTop: 15,
  },
  performanceList: {
    alignSelf: "stretch",
  },
  performanceListContainer: {
    flexGrow: 1,
  },
});

export default PerformanceList;
