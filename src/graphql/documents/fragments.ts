import { gql } from "apollo-boost";

export const ContestQueryAppearance = gql`
  fragment ContestQueryAppearance on Appearance {
    participantName
    instrumentName
  }
`;
