import React, { useState } from "react";
import { createAppContainer } from "react-navigation";
import {
  createStackNavigator,
  NavigationStackOptions,
} from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import HeaderButton from "../components/HeaderButton";
import colors from "../constants/colors";
import textStyles from "../constants/textStyles";
import { ListContestFragment as Contest } from "../graphql/types/generated";
import ContestPickerModal from "../screens/ContestPickerModal";
import PerformanceListScreen from "../screens/PerformanceListScreen";
import PerformanceScreen from "../screens/PerformanceScreen";
import ResultGroupListScreen from "../screens/ResultGroupListScreen";
import ResultListScreen from "../screens/ResultListScreen";

interface Props {
  contest: Contest;
  onSwitchContest: (contest: Contest) => void;
}

const ContestNavigator: React.FC<Props> = props => {
  const { contest, onSwitchContest } = props;

  const [contestPickerVisible, setContestPickerVisible] = useState(false);

  const contestPickerButton = (
    <HeaderButton
      title={contest.name}
      onPress={() => setContestPickerVisible(true)}
    />
  );

  const defaultNavigationOptions: NavigationStackOptions = {
    headerStyle: {
      backgroundColor: colors.brand,
      borderBottomWidth: 0,
    },
    headerTintColor: colors.white,
    headerTitleStyle: {
      ...textStyles.large,
      color: colors.white,
    },
    headerBackTitle: null,
  };

  const TimetableTab = createStackNavigator(
    {
      PerformanceList: {
        screen: PerformanceListScreen,
        params: { contest },
        navigationOptions: {
          headerTitle: contestPickerButton,
        },
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
      defaultNavigationOptions,
    }
  );

  const ResultsTab = createStackNavigator(
    {
      ResultGroupList: {
        screen: ResultGroupListScreen,
        params: { contest },
        navigationOptions: {
          headerTitle: contestPickerButton,
        },
      },
      ResultList: {
        screen: ResultListScreen,
        navigationOptions: {
          headerTitle: "Ergebnisse",
        },
      },
    },
    {
      navigationOptions: {
        tabBarLabel: "Ergebnisse",
      },
      defaultNavigationOptions,
    }
  );

  const TabNavigator = createBottomTabNavigator(
    {
      Timetable: TimetableTab,
      Results: ResultsTab,
    },
    {
      tabBarOptions: {
        labelStyle: {
          ...textStyles.extraSmall,
        },
        activeTintColor: colors.brand,
        inactiveTintColor: colors.mutedText,
      },
    }
  );

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
