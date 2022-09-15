import React, { useState } from "react";

import ContestContext from "../contexts/ContestContext";
import { ListContestFragment as Contest } from "../graphql/types/generated";
import ContestNavigator from "./ContestNavigator";
import LandingNavigator from "./LandingNavigator";

const RootView: React.FC = () => {
  const [contest, setContest] = useState<Contest>();

  return (
    <ContestContext.Provider value={{ contest, setContest }}>
      {contest ? <ContestNavigator /> : <LandingNavigator />}
    </ContestContext.Provider>
  );
};

export default RootView;
