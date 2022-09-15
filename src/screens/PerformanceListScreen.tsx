import { gql, NetworkStatus } from "@apollo/client";
import { RouteProp, useScrollToTop } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DateTime } from "luxon";
import React, { useContext, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import DatePicker from "../components/DatePicker";
import Divider from "../components/Divider";
import EmptyView from "../components/EmptyView";
import ErrorView from "../components/ErrorView";
import LoadingView from "../components/LoadingView";
import PerformanceRow from "../components/PerformanceRow";
import StagePicker from "../components/StagePicker";
import spacings from "../constants/spacings";
import ContestContext from "../contexts/ContestContext";
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
  navigation: NativeStackNavigationProp<
    TimetableStackParamList,
    "PerformanceList"
  >;
  route: RouteProp<TimetableStackParamList, "PerformanceList">;
}

const PerformanceList: React.FC<Props> = ({ navigation }) => {
  const { contest } = useContext(ContestContext);

  if (!contest) return <></>;

  const { id, dates, stages } = contest;

  const performanceListRef = useRef(null);
  useScrollToTop(performanceListRef);

  const initialDate = getInitialDate(dates);

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedStage, setSelectedStage] = useState(stages[0]);

  const { data, error, networkStatus, refetch } = usePerformanceListQuery({
    variables: {
      contestId: id,
      filter: { stageDate: selectedDate, stageId: selectedStage.id },
    },
    notifyOnNetworkStatusChange: true,
  });

  const renderPerformanceList = () => {
    if (error) {
      return <ErrorView />;
    } else if (networkStatus === NetworkStatus.loading) {
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
          refreshing={networkStatus === NetworkStatus.refetch}
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
          onRefresh={refetch}
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
    marginTop: spacings.small,
  },
  performanceList: {
    alignSelf: "stretch",
  },
  performanceListContainer: {
    flexGrow: 1,
  },
});

export default PerformanceList;
