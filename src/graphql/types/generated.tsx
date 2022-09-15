import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  Time: string;
};

export type Appearance = {
  __typename?: "Appearance";
  /** The appearance's age group (which may differ from the perfomance's). */
  ageGroup: Scalars["String"];
  id: Scalars["ID"];
  /** The name of the participant's instrument in this appearance. */
  instrumentName: Scalars["String"];
  /** Whether the appearance's participant has an accompanist role. */
  isAccompanist: Scalars["Boolean"];
  /** The full name of the appearance's participant. */
  participantName: Scalars["String"];
  /** The appearance's result, if publicly available. */
  result?: Maybe<Result>;
};

export type Contest = {
  __typename?: "Contest";
  /** The dates on which the contest is happening. */
  dates: Array<Scalars["Date"]>;
  /** The host of the contest. */
  host: Host;
  id: Scalars["ID"];
  /** The contest's name containing the round, year and host. */
  name: Scalars["String"];
  /** The stages used in this contest. */
  stages: Array<Stage>;
};

export type ContestCategory = {
  __typename?: "ContestCategory";
  id: Scalars["ID"];
  /** The contest category's name. */
  name: Scalars["String"];
  /** The amount of performances with public results in this contest category. */
  publicResultCount: Scalars["Int"];
};

export type Host = {
  __typename?: "Host";
  /** The country code(s) associated with the host. */
  countryCodes: Array<Scalars["String"]>;
  id: Scalars["ID"];
  /** The name of the host. */
  name: Scalars["String"];
};

export type Performance = {
  __typename?: "Performance";
  /** The performance's age group. */
  ageGroup: Scalars["String"];
  /** The performance's appearances. */
  appearances: Array<Appearance>;
  /** The name of the performance's category. */
  categoryName: Scalars["String"];
  id: Scalars["ID"];
  /** The performance's pieces. */
  pieces: Array<Piece>;
  /** The host of the performance's predecessor contest. */
  predecessorHost?: Maybe<Host>;
  /** The scheduled date of the performance. */
  stageDate: Scalars["Date"];
  /** The scheduled wall time of the performance. */
  stageTime: Scalars["Time"];
};

export type PerformanceFilter = {
  /** The ID of the performances' contest category. */
  contestCategoryId?: InputMaybe<Scalars["ID"]>;
  /** Whether the performances' results are public. */
  resultsPublic?: InputMaybe<Scalars["Boolean"]>;
  /** The date on which the performances are scheduled. */
  stageDate?: InputMaybe<Scalars["Date"]>;
  /** The ID of the stage on which the performances happen. */
  stageId?: InputMaybe<Scalars["ID"]>;
};

export type Piece = {
  __typename?: "Piece";
  id: Scalars["ID"];
  /**
   * For classical pieces, this contains the name and biographical dates of the piece's composer.
   * For popular pieces, the artist name is returned.
   */
  personInfo: Scalars["String"];
  /** The title of the piece. */
  title: Scalars["String"];
};

export type Result = {
  __typename?: "Result";
  /** Whether the participant will advance to the next round with this appearance. */
  advances: Scalars["Boolean"];
  /** The points awarded to this appearance. */
  points: Scalars["Int"];
  /** The prize corresponding to the appearance's points. */
  prize?: Maybe<Scalars["String"]>;
};

export type RootQueryType = {
  __typename?: "RootQueryType";
  /** The contest categories of a public contest. */
  contestCategories?: Maybe<Array<ContestCategory>>;
  /** The contests with public timetables. */
  contests: Array<Contest>;
  /** The public contests that are currently featured. */
  featuredContests: Array<Contest>;
  /** A single performance that's scheduled in a public contest. */
  performance?: Maybe<Performance>;
  /** The scheduled performances of a public contest. */
  performances?: Maybe<Array<Performance>>;
};

export type RootQueryTypeContestCategoriesArgs = {
  contestId: Scalars["ID"];
};

export type RootQueryTypeFeaturedContestsArgs = {
  limit: Scalars["Int"];
};

export type RootQueryTypePerformanceArgs = {
  id: Scalars["ID"];
};

export type RootQueryTypePerformancesArgs = {
  contestId: Scalars["ID"];
  filter: InputMaybe<PerformanceFilter>;
};

export type Stage = {
  __typename?: "Stage";
  id: Scalars["ID"];
  /** The public name of the stage. */
  name: Scalars["String"];
};

export type ListContestFragment = {
  __typename?: "Contest";
  id: string;
  name: string;
  dates: Array<string>;
  host: { __typename?: "Host"; id: string; countryCodes: Array<string> };
  stages: Array<{ __typename?: "Stage"; id: string; name: string }>;
};

export type PerformanceListAppearanceFragment = {
  __typename?: "Appearance";
  id: string;
  participantName: string;
  instrumentName: string;
};

export type PredecessorHostFragment = {
  __typename?: "Host";
  id: string;
  name: string;
  countryCodes: Array<string>;
};

export type ListPerformanceFragment = {
  __typename?: "Performance";
  id: string;
  stageTime: string;
  categoryName: string;
  ageGroup: string;
  appearances: Array<{
    __typename?: "Appearance";
    id: string;
    participantName: string;
    instrumentName: string;
  }>;
  predecessorHost?: {
    __typename?: "Host";
    id: string;
    name: string;
    countryCodes: Array<string>;
  } | null;
};

export type PerformanceAppearanceFragment = {
  __typename?: "Appearance";
  id: string;
  participantName: string;
  instrumentName: string;
  isAccompanist: boolean;
  ageGroup: string;
};

export type PerformancePieceFragment = {
  __typename?: "Piece";
  id: string;
  personInfo: string;
  title: string;
};

export type ResultListAppearanceFragment = {
  __typename?: "Appearance";
  id: string;
  participantName: string;
  instrumentName: string;
  result?: {
    __typename?: "Result";
    points: number;
    prize?: string | null;
    advances: boolean;
  } | null;
};

export type ContestPickerModalQueryVariables = Exact<{ [key: string]: never }>;

export type ContestPickerModalQuery = {
  __typename?: "RootQueryType";
  contests: Array<{
    __typename?: "Contest";
    id: string;
    name: string;
    dates: Array<string>;
    host: { __typename?: "Host"; id: string; countryCodes: Array<string> };
    stages: Array<{ __typename?: "Stage"; id: string; name: string }>;
  }>;
};

export type LandingQueryVariables = Exact<{ [key: string]: never }>;

export type LandingQuery = {
  __typename?: "RootQueryType";
  contests: Array<{
    __typename?: "Contest";
    id: string;
    name: string;
    dates: Array<string>;
    host: { __typename?: "Host"; id: string; countryCodes: Array<string> };
    stages: Array<{ __typename?: "Stage"; id: string; name: string }>;
  }>;
};

export type PerformanceListQueryVariables = Exact<{
  contestId: Scalars["ID"];
  filter: InputMaybe<PerformanceFilter>;
}>;

export type PerformanceListQuery = {
  __typename?: "RootQueryType";
  performances?: Array<{
    __typename?: "Performance";
    id: string;
    stageTime: string;
    categoryName: string;
    ageGroup: string;
    appearances: Array<{
      __typename?: "Appearance";
      id: string;
      participantName: string;
      instrumentName: string;
    }>;
    predecessorHost?: {
      __typename?: "Host";
      id: string;
      name: string;
      countryCodes: Array<string>;
    } | null;
  }> | null;
};

export type PerformanceQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type PerformanceQuery = {
  __typename?: "RootQueryType";
  performance?: {
    __typename?: "Performance";
    id: string;
    stageDate: string;
    stageTime: string;
    categoryName: string;
    ageGroup: string;
    appearances: Array<{
      __typename?: "Appearance";
      id: string;
      participantName: string;
      instrumentName: string;
      isAccompanist: boolean;
      ageGroup: string;
    }>;
    predecessorHost?: {
      __typename?: "Host";
      id: string;
      name: string;
      countryCodes: Array<string>;
    } | null;
    pieces: Array<{
      __typename?: "Piece";
      id: string;
      personInfo: string;
      title: string;
    }>;
  } | null;
};

export type ResultGroupListQueryVariables = Exact<{
  contestId: Scalars["ID"];
}>;

export type ResultGroupListQuery = {
  __typename?: "RootQueryType";
  contestCategories?: Array<{
    __typename?: "ContestCategory";
    id: string;
    name: string;
    publicResultCount: number;
  }> | null;
};

export type ResultListQueryVariables = Exact<{
  contestId: Scalars["ID"];
  contestCategoryId: Scalars["ID"];
}>;

export type ResultListQuery = {
  __typename?: "RootQueryType";
  performances?: Array<{
    __typename?: "Performance";
    id: string;
    ageGroup: string;
    appearances: Array<{
      __typename?: "Appearance";
      id: string;
      participantName: string;
      instrumentName: string;
      result?: {
        __typename?: "Result";
        points: number;
        prize?: string | null;
        advances: boolean;
      } | null;
    }>;
    predecessorHost?: {
      __typename?: "Host";
      id: string;
      name: string;
      countryCodes: Array<string>;
    } | null;
  }> | null;
};

export const ListContestFragmentDoc = gql`
  fragment ListContest on Contest {
    id
    name
    host {
      id
      countryCodes
    }
    dates
    stages {
      id
      name
    }
  }
`;
export const PerformanceListAppearanceFragmentDoc = gql`
  fragment PerformanceListAppearance on Appearance {
    id
    participantName
    instrumentName
  }
`;
export const PredecessorHostFragmentDoc = gql`
  fragment PredecessorHost on Host {
    id
    name
    countryCodes
  }
`;
export const ListPerformanceFragmentDoc = gql`
  fragment ListPerformance on Performance {
    id
    stageTime
    categoryName
    ageGroup
    appearances {
      ...PerformanceListAppearance
    }
    predecessorHost {
      ...PredecessorHost
    }
  }
  ${PerformanceListAppearanceFragmentDoc}
  ${PredecessorHostFragmentDoc}
`;
export const PerformanceAppearanceFragmentDoc = gql`
  fragment PerformanceAppearance on Appearance {
    id
    participantName
    instrumentName
    isAccompanist
    ageGroup
  }
`;
export const PerformancePieceFragmentDoc = gql`
  fragment PerformancePiece on Piece {
    id
    personInfo
    title
  }
`;
export const ResultListAppearanceFragmentDoc = gql`
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
export const ContestPickerModalDocument = gql`
  query ContestPickerModal {
    contests {
      ...ListContest
    }
  }
  ${ListContestFragmentDoc}
`;

/**
 * __useContestPickerModalQuery__
 *
 * To run a query within a React component, call `useContestPickerModalQuery` and pass it any options that fit your needs.
 * When your component renders, `useContestPickerModalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContestPickerModalQuery({
 *   variables: {
 *   },
 * });
 */
export function useContestPickerModalQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ContestPickerModalQuery,
    ContestPickerModalQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ContestPickerModalQuery,
    ContestPickerModalQueryVariables
  >(ContestPickerModalDocument, options);
}
export function useContestPickerModalLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ContestPickerModalQuery,
    ContestPickerModalQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ContestPickerModalQuery,
    ContestPickerModalQueryVariables
  >(ContestPickerModalDocument, options);
}
export type ContestPickerModalQueryHookResult = ReturnType<
  typeof useContestPickerModalQuery
>;
export type ContestPickerModalLazyQueryHookResult = ReturnType<
  typeof useContestPickerModalLazyQuery
>;
export type ContestPickerModalQueryResult = Apollo.QueryResult<
  ContestPickerModalQuery,
  ContestPickerModalQueryVariables
>;
export const LandingDocument = gql`
  query Landing {
    contests: featuredContests(limit: 4) {
      ...ListContest
    }
  }
  ${ListContestFragmentDoc}
`;

/**
 * __useLandingQuery__
 *
 * To run a query within a React component, call `useLandingQuery` and pass it any options that fit your needs.
 * When your component renders, `useLandingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLandingQuery({
 *   variables: {
 *   },
 * });
 */
export function useLandingQuery(
  baseOptions?: Apollo.QueryHookOptions<LandingQuery, LandingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LandingQuery, LandingQueryVariables>(
    LandingDocument,
    options
  );
}
export function useLandingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LandingQuery, LandingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LandingQuery, LandingQueryVariables>(
    LandingDocument,
    options
  );
}
export type LandingQueryHookResult = ReturnType<typeof useLandingQuery>;
export type LandingLazyQueryHookResult = ReturnType<typeof useLandingLazyQuery>;
export type LandingQueryResult = Apollo.QueryResult<
  LandingQuery,
  LandingQueryVariables
>;
export const PerformanceListDocument = gql`
  query PerformanceList($contestId: ID!, $filter: PerformanceFilter) {
    performances(contestId: $contestId, filter: $filter) {
      ...ListPerformance
    }
  }
  ${ListPerformanceFragmentDoc}
`;

/**
 * __usePerformanceListQuery__
 *
 * To run a query within a React component, call `usePerformanceListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePerformanceListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePerformanceListQuery({
 *   variables: {
 *      contestId: // value for 'contestId'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePerformanceListQuery(
  baseOptions: Apollo.QueryHookOptions<
    PerformanceListQuery,
    PerformanceListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PerformanceListQuery, PerformanceListQueryVariables>(
    PerformanceListDocument,
    options
  );
}
export function usePerformanceListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PerformanceListQuery,
    PerformanceListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PerformanceListQuery,
    PerformanceListQueryVariables
  >(PerformanceListDocument, options);
}
export type PerformanceListQueryHookResult = ReturnType<
  typeof usePerformanceListQuery
>;
export type PerformanceListLazyQueryHookResult = ReturnType<
  typeof usePerformanceListLazyQuery
>;
export type PerformanceListQueryResult = Apollo.QueryResult<
  PerformanceListQuery,
  PerformanceListQueryVariables
>;
export const PerformanceDocument = gql`
  query Performance($id: ID!) {
    performance(id: $id) {
      id
      stageDate
      stageTime
      categoryName
      ageGroup
      appearances {
        ...PerformanceAppearance
      }
      predecessorHost {
        ...PredecessorHost
      }
      pieces {
        ...PerformancePiece
      }
    }
  }
  ${PerformanceAppearanceFragmentDoc}
  ${PredecessorHostFragmentDoc}
  ${PerformancePieceFragmentDoc}
`;

/**
 * __usePerformanceQuery__
 *
 * To run a query within a React component, call `usePerformanceQuery` and pass it any options that fit your needs.
 * When your component renders, `usePerformanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePerformanceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePerformanceQuery(
  baseOptions: Apollo.QueryHookOptions<
    PerformanceQuery,
    PerformanceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PerformanceQuery, PerformanceQueryVariables>(
    PerformanceDocument,
    options
  );
}
export function usePerformanceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PerformanceQuery,
    PerformanceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PerformanceQuery, PerformanceQueryVariables>(
    PerformanceDocument,
    options
  );
}
export type PerformanceQueryHookResult = ReturnType<typeof usePerformanceQuery>;
export type PerformanceLazyQueryHookResult = ReturnType<
  typeof usePerformanceLazyQuery
>;
export type PerformanceQueryResult = Apollo.QueryResult<
  PerformanceQuery,
  PerformanceQueryVariables
>;
export const ResultGroupListDocument = gql`
  query ResultGroupList($contestId: ID!) {
    contestCategories(contestId: $contestId) {
      id
      name
      publicResultCount
    }
  }
`;

/**
 * __useResultGroupListQuery__
 *
 * To run a query within a React component, call `useResultGroupListQuery` and pass it any options that fit your needs.
 * When your component renders, `useResultGroupListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResultGroupListQuery({
 *   variables: {
 *      contestId: // value for 'contestId'
 *   },
 * });
 */
export function useResultGroupListQuery(
  baseOptions: Apollo.QueryHookOptions<
    ResultGroupListQuery,
    ResultGroupListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ResultGroupListQuery, ResultGroupListQueryVariables>(
    ResultGroupListDocument,
    options
  );
}
export function useResultGroupListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ResultGroupListQuery,
    ResultGroupListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ResultGroupListQuery,
    ResultGroupListQueryVariables
  >(ResultGroupListDocument, options);
}
export type ResultGroupListQueryHookResult = ReturnType<
  typeof useResultGroupListQuery
>;
export type ResultGroupListLazyQueryHookResult = ReturnType<
  typeof useResultGroupListLazyQuery
>;
export type ResultGroupListQueryResult = Apollo.QueryResult<
  ResultGroupListQuery,
  ResultGroupListQueryVariables
>;
export const ResultListDocument = gql`
  query ResultList($contestId: ID!, $contestCategoryId: ID!) {
    performances(
      contestId: $contestId
      filter: { contestCategoryId: $contestCategoryId, resultsPublic: true }
    ) {
      id
      ageGroup
      appearances {
        ...ResultListAppearance
      }
      predecessorHost {
        ...PredecessorHost
      }
    }
  }
  ${ResultListAppearanceFragmentDoc}
  ${PredecessorHostFragmentDoc}
`;

/**
 * __useResultListQuery__
 *
 * To run a query within a React component, call `useResultListQuery` and pass it any options that fit your needs.
 * When your component renders, `useResultListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResultListQuery({
 *   variables: {
 *      contestId: // value for 'contestId'
 *      contestCategoryId: // value for 'contestCategoryId'
 *   },
 * });
 */
export function useResultListQuery(
  baseOptions: Apollo.QueryHookOptions<
    ResultListQuery,
    ResultListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ResultListQuery, ResultListQueryVariables>(
    ResultListDocument,
    options
  );
}
export function useResultListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ResultListQuery,
    ResultListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ResultListQuery, ResultListQueryVariables>(
    ResultListDocument,
    options
  );
}
export type ResultListQueryHookResult = ReturnType<typeof useResultListQuery>;
export type ResultListLazyQueryHookResult = ReturnType<
  typeof useResultListLazyQuery
>;
export type ResultListQueryResult = Apollo.QueryResult<
  ResultListQuery,
  ResultListQueryVariables
>;
