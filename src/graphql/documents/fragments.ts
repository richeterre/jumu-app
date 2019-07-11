import { gql } from "apollo-boost";

export const ListContest = gql`
  fragment ListContest on Contest {
    id
    name
    countryCode
    dates
    stages {
      id
      name
    }
  }
`;

export const ContestQueryAppearance = gql`
  fragment ContestQueryAppearance on Appearance {
    participantName
    instrumentName
  }
`;
