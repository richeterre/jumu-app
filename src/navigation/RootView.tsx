import React, { useState } from "react";

import { ListContestFragment as Contest } from "../graphql/types/generated";
import LandingScreen from "../screens/LandingScreen";
import ContestNavigator from "./ContestNavigator";

const RootView: React.FC = () => {
  const [contest, setContest] = useState<Contest>();

  return contest ? (
    <ContestNavigator contest={contest} onSwitchContest={setContest} />
  ) : (
    <LandingScreen onSelectContest={setContest} />
  );
};

export default RootView;
