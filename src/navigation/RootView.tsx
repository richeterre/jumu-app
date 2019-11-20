import React, { useState } from "react";

import { ListContestFragment as Contest } from "../graphql/types/generated";
import ContestNavigator from "./ContestNavigator";
import LandingNavigator from "./LandingNavigator";

const RootView: React.FC = () => {
  const [contest, setContest] = useState<Contest>();

  return contest ? (
    <ContestNavigator contest={contest} onSwitchContest={setContest} />
  ) : (
    <LandingNavigator onSelectContest={setContest} />
  );
};

export default RootView;
