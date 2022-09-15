import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { defaultStackScreenOptions } from "../constants/defaults";
import textStyles from "../constants/textStyles";
import LandingScreen from "../screens/LandingScreen";

export type LandingStackParamList = {
  Landing: Record<string, never>;
};

const LandingStack = createNativeStackNavigator<LandingStackParamList>();

const LandingNavigator: React.FC = () => (
  <LandingStack.Navigator screenOptions={defaultStackScreenOptions}>
    <LandingStack.Screen
      component={LandingScreen}
      name="Landing"
      options={{
        headerTitle: "Jumu ♫ weltweit",
        headerTitleStyle: {
          ...textStyles.large,
        },
      }}
    />
  </LandingStack.Navigator>
);

export default LandingNavigator;
