import { createContext } from "react";

import { ListContestFragment as Contest } from "../graphql/types/generated";

interface ContestContextInterface {
  contest?: Contest;
  setContest: (contest?: Contest) => void;
}

export default createContext<ContestContextInterface>({
  contest: undefined,
  setContest: () => undefined,
});
