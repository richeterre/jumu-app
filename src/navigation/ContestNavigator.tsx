import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { Image } from "react-native";

import scrollFilledIcon from "../../assets/images/icon-scroll-filled.png";
import scrollIcon from "../../assets/images/icon-scroll.png";
import timetableFilledIcon from "../../assets/images/icon-timetable-filled.png";
import timetableIcon from "../../assets/images/icon-timetable.png";
import HeaderButton from "../components/HeaderButton";
import colors from "../constants/colors";
import { defaultStackScreenOptions } from "../constants/defaults";
import textStyles from "../constants/textStyles";
import {
  ListContestFragment as Contest,
  Stage,
} from "../graphql/types/generated";
import ContestPickerModal from "../screens/ContestPickerModal";
import PerformanceListScreen from "../screens/PerformanceListScreen";
import PerformanceScreen from "../screens/PerformanceScreen";
import ResultGroupListScreen from "../screens/ResultGroupListScreen";
import ResultListScreen from "../screens/ResultListScreen";

export type TimetableStackParamList = {
  PerformanceList: { contest: Contest };
  Performance: { id: string; stage: Stage };
};

export type ResultsStackParamList = {
  ResultGroupList: { contest: Contest };
  ResultList: { contestId: string; contestCategoryId: string };
};

type BottomTabParamList = {
  Timetable: undefined;
  Results: undefined;
};

const TimetableStack = createStackNavigator<TimetableStackParamList>();
const ResultsStack = createStackNavigator<ResultsStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

interface Props {
  contest: Contest;
  onSwitchContest: (contest: Contest) => void;
}

const ContestNavigator: React.FC<Props> = props => {
  const { contest, onSwitchContest } = props;

  const [contestPickerVisible, setContestPickerVisible] = useState(false);

  const ContestPickerButton = () => (
    <HeaderButton
      title={contest.name}
      onPress={() => setContestPickerVisible(true)}
    />
  );

  const Timetable = () => (
    <TimetableStack.Navigator screenOptions={defaultStackScreenOptions}>
      <TimetableStack.Screen
        component={PerformanceListScreen}
        initialParams={{ contest }}
        name="PerformanceList"
        options={{ headerTitle: ContestPickerButton }}
      />
      <TimetableStack.Screen
        component={PerformanceScreen}
        name="Performance"
        options={{ headerTitle: "Vorspieldetails" }}
      />
    </TimetableStack.Navigator>
  );

  const Results = () => (
    <ResultsStack.Navigator screenOptions={defaultStackScreenOptions}>
      <ResultsStack.Screen
        component={ResultGroupListScreen}
        initialParams={{ contest }}
        name="ResultGroupList"
        options={{ headerTitle: ContestPickerButton }}
      />
      <ResultsStack.Screen
        component={ResultListScreen}
        name="ResultList"
        options={{ headerTitle: "Ergebnisse" }}
      />
    </ResultsStack.Navigator>
  );

  return (
    <>
      <BottomTab.Navigator
        tabBarOptions={{
          labelStyle: { ...textStyles.extraSmall },
          activeTintColor: colors.brand,
          inactiveTintColor: colors.midGray,
          style: { backgroundColor: colors.lighterGray },
        }}
      >
        <BottomTab.Screen
          component={Timetable}
          name="Timetable"
          options={{
            tabBarLabel: "Vorspiele",
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={focused ? timetableFilledIcon : timetableIcon}
                style={{ tintColor: color }}
              />
            ),
          }}
        />
        <BottomTab.Screen
          component={Results}
          name="Results"
          options={{
            tabBarLabel: "Ergebnisse",
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={focused ? scrollFilledIcon : scrollIcon}
                style={{ tintColor: color }}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
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
