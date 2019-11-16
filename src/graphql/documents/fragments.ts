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
    id
    participantName
    instrumentName
  }
`;

export const PerformanceQueryAppearance = gql`
  fragment PerformanceQueryAppearance on Appearance {
    id
    participantName
    instrumentName
    isAccompanist
  }
`;

export const PerformanceQueryPiece = gql`
  fragment PerformanceQueryPiece on Piece {
    id
    personInfo
    title
  }
`;
