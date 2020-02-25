import { RouteProp, useScrollToTop } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { gql } from "apollo-boost";
import { DateTime } from "luxon";
import React, { useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import DatePicker from "../components/DatePicker";
import Divider from "../components/Divider";
import EmptyView from "../components/EmptyView";
import ErrorView from "../components/ErrorView";
import LoadingView from "../components/LoadingView";
import PerformanceRow from "../components/PerformanceRow";
import StagePicker from "../components/StagePicker";
import { ListPerformance } from "../graphql/documents/fragments";
import { usePerformanceListQuery } from "../graphql/types/generated";
import { TimetableStackParamList } from "../navigation/ContestNavigator";

gql`
  query PerformanceList($contestId: ID!, $filter: PerformanceFilter) {
    performances(contestId: $contestId, filter: $filter) {
      ...ListPerformance
    }
  }
  ${ListPerformance}
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

  const initialDate = getInitialDate(dates);

  const [selectedDate, setSelectedDate] = useState(initialDate);
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
              performance={item}
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
      <DatePicker
        dates={dates}
        selectedDate={selectedDate}
        style={styles.picker}
        onSelectDate={setSelectedDate}
      />
      <StagePicker
        selectedStage={selectedStage}
        stages={stages}
        style={styles.picker}
        onSelectStage={setSelectedStage}
      />
      {renderPerformanceList()}
    </>
  );
};

const getInitialDate = (dates: string[]) => {
  const today = DateTime.local().toISODate();
  return dates.includes(today) ? today : dates[0];
};

const styles = StyleSheet.create({
  picker: {
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
