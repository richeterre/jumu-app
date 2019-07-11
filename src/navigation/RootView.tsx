import React, { useState } from "react";

import ContestNavigator from "./ContestNavigator";
import { ListContestFragment as Contest } from "../graphql/types/generated";
import LandingScreen from "../screens/LandingScreen";

const RootView: React.FC = () => {
  const [contest, setContest] = useState<Contest>();

  return contest ? (
    <ContestNavigator contest={contest} onSwitchContest={setContest} />
  ) : (
    <LandingScreen onSelectContest={setContest} />
  );
};

export default RootView;
