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

export const PerformanceListAppearance = gql`
  fragment PerformanceListAppearance on Appearance {
    id
    participantName
    instrumentName
  }
`;

export const PerformanceAppearance = gql`
  fragment PerformanceAppearance on Appearance {
    id
    participantName
    instrumentName
    isAccompanist
    ageGroup
  }
`;

export const PerformancePiece = gql`
  fragment PerformancePiece on Piece {
    id
    personInfo
    title
  }
`;

export const ResultListAppearance = gql`
  fragment ResultListAppearance on Appearance {
    id
    participantName
    instrumentName
    result {
      points
      prize
      advances
    }
  }
`;
