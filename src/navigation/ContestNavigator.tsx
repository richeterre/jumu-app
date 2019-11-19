import React, { useState } from "react";
import { Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { ListContestFragment as Contest } from "../graphql/types/generated";
import ContestCategoryListScreen from "../screens/ContestCategoryListScreen";
import ContestPickerModal from "../screens/ContestPickerModal";
import ContestScreen from "../screens/ContestScreen";
import PerformanceScreen from "../screens/PerformanceScreen";
import ResultListScreen from "../screens/ResultListScreen";

interface Props {
  contest: Contest;
  onSwitchContest: (contest: Contest) => void;
}

const ContestNavigator: React.FC<Props> = props => {
  const [contestPickerVisible, setContestPickerVisible] = useState(false);

  const { contest, onSwitchContest } = props;

  const headerTitle = (
    <Button
      title={contest.name}
      onPress={() => setContestPickerVisible(true)}
    />
  );

  const TimetableTab = createStackNavigator(
    {
      PerformanceList: {
        screen: ContestScreen,
        params: { contest },
        navigationOptions: { headerTitle, headerBackTitle: "Zeitplan" },
      },
      Performance: {
        screen: PerformanceScreen,
        navigationOptions: {
          headerTitle: "Vorspieldetails",
        },
      },
    },
    {
      navigationOptions: {
        tabBarLabel: "Zeitplan",
      },
    }
  );

  const ResultsTab = createStackNavigator(
    {
      ContestCategoryList: {
        screen: ContestCategoryListScreen,
        params: { contest },
        navigationOptions: { headerTitle },
      },
      ResultList: {
        screen: ResultListScreen,
        navigationOptions: {
          headerTitle: "Ergebnisse",
        },
      }
    },
    {
      navigationOptions: {
        tabBarLabel: "Ergebnisse",
      },
    }
  );

  const TabNavigator = createBottomTabNavigator({
    Timetable: TimetableTab,
    Results: ResultsTab,
  });

  const AppContainer = createAppContainer(TabNavigator);

  return (
    <>
      <AppContainer />
      <ContestPickerModal
        visible={contestPickerVisible}
        onCancel={() => setContestPickerVisible(false)}
        onSelectContest={contest => {
          setContestPickerVisible(false);
          onSwitchContest(contest);
        }}
      />
    </>
  );
};

export default ContestNavigator;
