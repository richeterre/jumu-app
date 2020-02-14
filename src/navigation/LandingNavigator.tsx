import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { defaultStackScreenOptions } from "../constants/defaults";
import { ListContestFragment as Contest } from "../graphql/types/generated";
import LandingScreen from "../screens/LandingScreen";

export type LandingStackParamList = {
  Landing: { onSelectContest: (contest: Contest) => void };
};

const LandingStack = createStackNavigator<LandingStackParamList>();

interface Props {
  onSelectContest: (contest: Contest) => void;
}

const ContestNavigator: React.FC<Props> = props => {
  const { onSelectContest } = props;

  return (
    <LandingStack.Navigator screenOptions={defaultStackScreenOptions}>
      <LandingStack.Screen
        component={LandingScreen}
        initialParams={{ onSelectContest }}
        name="Landing"
        options={{ headerTitle: "Jumu weltweit" }}
      />
    </LandingStack.Navigator>
  );
};

export default ContestNavigator;
