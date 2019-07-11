import React, { useState } from "react";

import ContestPickerScreen from "../screens/ContestPickerScreen";
import ContestNavigator from "./ContestNavigator";
import { ListContestFragment as Contest } from "../graphql/types/generated";

const RootView = () => {
  const [contest, setContest] = useState<Contest>();

  return contest ? (
    <ContestNavigator contest={contest} onSwitchContest={setContest} />
  ) : (
    <ContestPickerScreen onSelectContest={setContest} />
  );
};

export default RootView;
