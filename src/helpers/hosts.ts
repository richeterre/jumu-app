import { PredecessorHostFragment } from "../graphql/types/generated";
import { flags } from "./countries";

export const formatHost = (host: PredecessorHostFragment) =>
  `${flags(host.countryCodes)} ${host.name}`;
