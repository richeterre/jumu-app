import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { defaultStackScreenOptions } from "../constants/defaults";
import textStyles from "../constants/textStyles";
import LandingScreen from "../screens/LandingScreen";

export type LandingStackParamList = {
  Landing: { onSelectContest: (contest?: Contest) => void };
};

const LandingStack = createNativeStackNavigator<LandingStackParamList>();

interface Props {
  onSelectContest: (contest?: Contest) => void;
}

const ContestNavigator: React.FC<Props> = props => {
  const { onSelectContest } = props;

  return (
    <LandingStack.Navigator screenOptions={defaultStackScreenOptions}>
      <LandingStack.Screen
        component={LandingScreen}
        initialParams={{ onSelectContest }}
        name="Landing"
        options={{
          headerTitle: "Jumu ♫ weltweit",
          headerTitleStyle: {
            ...textStyles.large,
            marginBottom: -7, // fix font issue with the ♫ character
          },
        }}
      />
    </LandingStack.Navigator>
  );
};

export default ContestNavigator;
