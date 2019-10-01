import ContestScreen from "../screens/ContestScreen";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import React, { useState } from "react";
import { Button, Modal } from "react-native";
import { ListContestFragment as Contest } from "../graphql/types/generated";
import ContestPickerModal from "../screens/ContestPickerModal";

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
        params: { contest: contest },
        navigationOptions: { headerTitle },
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
        screen: ContestScreen,
        params: { contest: contest },
        navigationOptions: { headerTitle },
      },
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
