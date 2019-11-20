import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { defaultNavigationOptions } from "../constants/defaults";
import { ListContestFragment as Contest } from "../graphql/types/generated";
import LandingScreen from "../screens/LandingScreen";

interface Props {
  onSelectContest: (contest: Contest) => void;
}

const ContestNavigator: React.FC<Props> = props => {
  const { onSelectContest } = props;

  const StackNavigator = createStackNavigator(
    {
      Landing: {
        screen: LandingScreen,
        params: { onSelectContest },
      },
    },
    { defaultNavigationOptions }
  );

  const AppContainer = createAppContainer(StackNavigator);

  return <AppContainer />;
};

export default ContestNavigator;
