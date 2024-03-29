import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { Image } from "react-native";

import scrollIcon from "../../assets/images/icon-scroll.png";
import scrollFilledIcon from "../../assets/images/icon-scroll-filled.png";
import timetableIcon from "../../assets/images/icon-timetable.png";
import timetableFilledIcon from "../../assets/images/icon-timetable-filled.png";
import HeaderButton from "../components/HeaderButton";
import colors from "../constants/colors";
import { defaultStackScreenOptions } from "../constants/defaults";
import textStyles from "../constants/textStyles";
import ContestContext from "../contexts/ContestContext";
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

const TimetableStack = createNativeStackNavigator<TimetableStackParamList>();
const ResultsStack = createNativeStackNavigator<ResultsStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const ContestNavigator: React.FC = () => {
  const { contest, setContest } = useContext(ContestContext);

  const [contestPickerVisible, setContestPickerVisible] = useState(false);

  if (!contest) return <></>;

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
        screenOptions={{
          tabBarLabelStyle: { ...textStyles.extraSmall },
          tabBarActiveTintColor: colors.brand,
          tabBarInactiveTintColor: colors.midGray,
          tabBarStyle: { backgroundColor: colors.lighterGray },
        }}
      >
        <BottomTab.Screen
          component={Timetable}
          name="Timetable"
          options={{
            headerShown: false,
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
            headerShown: false,
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
          setContest(contest);
        }}
      />
    </>
  );
};

export default ContestNavigator;
