import ContestScreen from "../screens/ContestScreen";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import React, { useState } from "react";
import { Button, Modal } from "react-native";
import { ListContestFragment as Contest } from "../graphql/types/generated";
import ContestPickerScreen from "../screens/ContestPickerScreen";

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
        navigationOptions: { headerTitle }
      }
    },
    {
      navigationOptions: {
        tabBarLabel: "Zeitplan"
      }
    }
  );

  const ResultsTab = createStackNavigator(
    {
      ContestCategoryList: {
        screen: ContestScreen,
        params: { contest: contest },
        navigationOptions: { headerTitle }
      }
    },
    {
      navigationOptions: {
        tabBarLabel: "Ergebnisse"
      }
    }
  );

  const TabNavigator = createBottomTabNavigator({
    Timetable: TimetableTab,
    Results: ResultsTab
  });

  const AppContainer = createAppContainer(TabNavigator);

  return (
    <>
      <AppContainer />
      {contestPickerVisible && (
        <Modal>
          <ContestPickerScreen
            onSelectContest={contest => {
              setContestPickerVisible(false);
              onSwitchContest(contest);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default ContestNavigator;
