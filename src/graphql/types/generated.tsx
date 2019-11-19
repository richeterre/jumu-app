import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a date. The Date appears in a JSON
   * response as an ISO8601 formatted string.
   **/
  Date: string;
  /**
   * The `Time` scalar type represents a time. The Time appears in a JSON
   * response as an ISO8601 formatted string.
   **/
  Time: string;
};

export type Appearance = {
  __typename?: "Appearance";
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
  /** The country code of the contest's host. */
  countryCode: Scalars["String"];
  /** The dates on which the contest is happening. */
  dates: Array<Scalars["Date"]>;
  id: Scalars["ID"];
  /** The contest’s name containing the round, year and host. */
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
  /** The country code of the host. */
  countryCode: Scalars["String"];
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
  contestCategoryId?: Maybe<Scalars["ID"]>;
  /** Whether the performances' results are public. */
  resultsPublic?: Maybe<Scalars["Boolean"]>;
  /** The date on which the performances are scheduled. */
  stageDate?: Maybe<Scalars["Date"]>;
  /** The ID of the stage on which the performances happen. */
  stageId?: Maybe<Scalars["ID"]>;
};

export type Piece = {
  __typename?: "Piece";
  id: Scalars["ID"];
  /**
   * For classical pieces, this contains the name and biographical dates of the piece's composer.
   * For popular pieces, the artist name is returned.
   **/
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
  /** A single performance that's scheduled in a public contest. */
  performance?: Maybe<Performance>;
  /** The scheduled performances of a public contest. */
  performances?: Maybe<Array<Performance>>;
};

export type RootQueryTypeContestCategoriesArgs = {
  contestId: Scalars["ID"];
};

export type RootQueryTypePerformanceArgs = {
  id: Scalars["ID"];
};

export type RootQueryTypePerformancesArgs = {
  contestId: Scalars["ID"];
  filter?: Maybe<PerformanceFilter>;
};

export type Stage = {
  __typename?: "Stage";
  id: Scalars["ID"];
  /** The public name of the stage. */
  name: Scalars["String"];
};

export type ListContestFragment = { __typename?: "Contest" } & Pick<
  Contest,
  "id" | "name" | "countryCode" | "dates"
> & { stages: Array<{ __typename?: "Stage" } & Pick<Stage, "id" | "name">> };

export type ContestQueryAppearanceFragment = {
  __typename?: "Appearance";
} & Pick<Appearance, "id" | "participantName" | "instrumentName">;

export type PerformanceQueryAppearanceFragment = {
  __typename?: "Appearance";
} & Pick<
  Appearance,
  "id" | "participantName" | "instrumentName" | "isAccompanist"
>;

export type PerformanceQueryPieceFragment = { __typename?: "Piece" } & Pick<
  Piece,
  "id" | "personInfo" | "title"
>;

export type ResultListQueryAppearanceFragment = {
  __typename?: "Appearance";
} & Pick<Appearance, "id" | "participantName" | "instrumentName"> & {
    result: Maybe<{ __typename?: "Result" } & Pick<Result, "points">>;
  };

export type ContestCategoryListScreenQueryVariables = {
  contestId: Scalars["ID"];
};

export type ContestCategoryListScreenQuery = {
  __typename?: "RootQueryType";
} & {
  contestCategories: Maybe<
    Array<
      { __typename?: "ContestCategory" } & Pick<
        ContestCategory,
        "id" | "name" | "publicResultCount"
      >
    >
  >;
};

export type ContestPickerModalQueryVariables = {};

export type ContestPickerModalQuery = { __typename?: "RootQueryType" } & {
  contests: Array<{ __typename?: "Contest" } & ListContestFragment>;
};

export type ContestScreenQueryVariables = {
  contestId: Scalars["ID"];
  filter?: Maybe<PerformanceFilter>;
};

export type ContestScreenQuery = { __typename?: "RootQueryType" } & {
  performances: Maybe<
    Array<
      { __typename?: "Performance" } & Pick<
        Performance,
        "id" | "stageTime" | "categoryName" | "ageGroup"
      > & {
          appearances: Array<
            { __typename?: "Appearance" } & ContestQueryAppearanceFragment
          >;
        }
    >
  >;
};

export type LandingScreenQueryVariables = {};

export type LandingScreenQuery = { __typename?: "RootQueryType" } & {
  contests: Array<{ __typename?: "Contest" } & ListContestFragment>;
};

export type PerformanceScreenQueryVariables = {
  id: Scalars["ID"];
};

export type PerformanceScreenQuery = { __typename?: "RootQueryType" } & {
  performance: Maybe<
    { __typename?: "Performance" } & Pick<
      Performance,
      "id" | "stageDate" | "stageTime" | "categoryName" | "ageGroup"
    > & {
        appearances: Array<
          { __typename?: "Appearance" } & PerformanceQueryAppearanceFragment
        >;
        pieces: Array<{ __typename?: "Piece" } & PerformanceQueryPieceFragment>;
      }
  >;
};

export type ResultListScreenQueryVariables = {
  contestId: Scalars["ID"];
  contestCategoryId: Scalars["ID"];
};

export type ResultListScreenQuery = { __typename?: "RootQueryType" } & {
  performances: Maybe<
    Array<
      { __typename?: "Performance" } & Pick<Performance, "id"> & {
          appearances: Array<
            { __typename?: "Appearance" } & ResultListQueryAppearanceFragment
          >;
        }
    >
  >;
};

export const ListContestFragmentDoc = gql`
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
export const ContestQueryAppearanceFragmentDoc = gql`
  fragment ContestQueryAppearance on Appearance {
    id
    participantName
    instrumentName
  }
`;
export const PerformanceQueryAppearanceFragmentDoc = gql`
  fragment PerformanceQueryAppearance on Appearance {
    id
    participantName
    instrumentName
    isAccompanist
  }
`;
export const PerformanceQueryPieceFragmentDoc = gql`
  fragment PerformanceQueryPiece on Piece {
    id
    personInfo
    title
  }
`;
export const ResultListQueryAppearanceFragmentDoc = gql`
  fragment ResultListQueryAppearance on Appearance {
    id
    participantName
    instrumentName
    result {
      points
    }
  }
`;
export const ContestCategoryListScreenDocument = gql`
  query ContestCategoryListScreen($contestId: ID!) {
    contestCategories(contestId: $contestId) {
      id
      name
      publicResultCount
    }
  }
`;

/**
 * __useContestCategoryListScreenQuery__
 *
 * To run a query within a React component, call `useContestCategoryListScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useContestCategoryListScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContestCategoryListScreenQuery({
 *   variables: {
 *      contestId: // value for 'contestId'
 *   },
 * });
 */
export function useContestCategoryListScreenQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ContestCategoryListScreenQuery,
    ContestCategoryListScreenQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    ContestCategoryListScreenQuery,
    ContestCategoryListScreenQueryVariables
  >(ContestCategoryListScreenDocument, baseOptions);
}
export function useContestCategoryListScreenLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ContestCategoryListScreenQuery,
    ContestCategoryListScreenQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ContestCategoryListScreenQuery,
    ContestCategoryListScreenQueryVariables
  >(ContestCategoryListScreenDocument, baseOptions);
}
export type ContestCategoryListScreenQueryHookResult = ReturnType<
  typeof useContestCategoryListScreenQuery
>;
export type ContestCategoryListScreenLazyQueryHookResult = ReturnType<
  typeof useContestCategoryListScreenLazyQuery
>;
export type ContestCategoryListScreenQueryResult = ApolloReactCommon.QueryResult<
  ContestCategoryListScreenQuery,
  ContestCategoryListScreenQueryVariables
>;
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ContestPickerModalQuery,
    ContestPickerModalQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    ContestPickerModalQuery,
    ContestPickerModalQueryVariables
  >(ContestPickerModalDocument, baseOptions);
}
export function useContestPickerModalLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ContestPickerModalQuery,
    ContestPickerModalQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ContestPickerModalQuery,
    ContestPickerModalQueryVariables
  >(ContestPickerModalDocument, baseOptions);
}
export type ContestPickerModalQueryHookResult = ReturnType<
  typeof useContestPickerModalQuery
>;
export type ContestPickerModalLazyQueryHookResult = ReturnType<
  typeof useContestPickerModalLazyQuery
>;
export type ContestPickerModalQueryResult = ApolloReactCommon.QueryResult<
  ContestPickerModalQuery,
  ContestPickerModalQueryVariables
>;
export const ContestScreenDocument = gql`
  query ContestScreen($contestId: ID!, $filter: PerformanceFilter) {
    performances(contestId: $contestId, filter: $filter) {
      id
      stageTime
      categoryName
      ageGroup
      appearances {
        ...ContestQueryAppearance
      }
    }
  }
  ${ContestQueryAppearanceFragmentDoc}
`;

/**
 * __useContestScreenQuery__
 *
 * To run a query within a React component, call `useContestScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useContestScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContestScreenQuery({
 *   variables: {
 *      contestId: // value for 'contestId'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useContestScreenQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ContestScreenQuery,
    ContestScreenQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    ContestScreenQuery,
    ContestScreenQueryVariables
  >(ContestScreenDocument, baseOptions);
}
export function useContestScreenLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ContestScreenQuery,
    ContestScreenQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ContestScreenQuery,
    ContestScreenQueryVariables
  >(ContestScreenDocument, baseOptions);
}
export type ContestScreenQueryHookResult = ReturnType<
  typeof useContestScreenQuery
>;
export type ContestScreenLazyQueryHookResult = ReturnType<
  typeof useContestScreenLazyQuery
>;
export type ContestScreenQueryResult = ApolloReactCommon.QueryResult<
  ContestScreenQuery,
  ContestScreenQueryVariables
>;
export const LandingScreenDocument = gql`
  query LandingScreen {
    contests {
      ...ListContest
    }
  }
  ${ListContestFragmentDoc}
`;

/**
 * __useLandingScreenQuery__
 *
 * To run a query within a React component, call `useLandingScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useLandingScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLandingScreenQuery({
 *   variables: {
 *   },
 * });
 */
export function useLandingScreenQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    LandingScreenQuery,
    LandingScreenQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    LandingScreenQuery,
    LandingScreenQueryVariables
  >(LandingScreenDocument, baseOptions);
}
export function useLandingScreenLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    LandingScreenQuery,
    LandingScreenQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    LandingScreenQuery,
    LandingScreenQueryVariables
  >(LandingScreenDocument, baseOptions);
}
export type LandingScreenQueryHookResult = ReturnType<
  typeof useLandingScreenQuery
>;
export type LandingScreenLazyQueryHookResult = ReturnType<
  typeof useLandingScreenLazyQuery
>;
export type LandingScreenQueryResult = ApolloReactCommon.QueryResult<
  LandingScreenQuery,
  LandingScreenQueryVariables
>;
export const PerformanceScreenDocument = gql`
  query PerformanceScreen($id: ID!) {
    performance(id: $id) {
      id
      stageDate
      stageTime
      categoryName
      ageGroup
      appearances {
        ...PerformanceQueryAppearance
      }
      pieces {
        ...PerformanceQueryPiece
      }
    }
  }
  ${PerformanceQueryAppearanceFragmentDoc}
  ${PerformanceQueryPieceFragmentDoc}
`;

/**
 * __usePerformanceScreenQuery__
 *
 * To run a query within a React component, call `usePerformanceScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `usePerformanceScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePerformanceScreenQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePerformanceScreenQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PerformanceScreenQuery,
    PerformanceScreenQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    PerformanceScreenQuery,
    PerformanceScreenQueryVariables
  >(PerformanceScreenDocument, baseOptions);
}
export function usePerformanceScreenLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PerformanceScreenQuery,
    PerformanceScreenQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    PerformanceScreenQuery,
    PerformanceScreenQueryVariables
  >(PerformanceScreenDocument, baseOptions);
}
export type PerformanceScreenQueryHookResult = ReturnType<
  typeof usePerformanceScreenQuery
>;
export type PerformanceScreenLazyQueryHookResult = ReturnType<
  typeof usePerformanceScreenLazyQuery
>;
export type PerformanceScreenQueryResult = ApolloReactCommon.QueryResult<
  PerformanceScreenQuery,
  PerformanceScreenQueryVariables
>;
export const ResultListScreenDocument = gql`
  query ResultListScreen($contestId: ID!, $contestCategoryId: ID!) {
    performances(
      contestId: $contestId
      filter: { contestCategoryId: $contestCategoryId, resultsPublic: true }
    ) {
      id
      appearances {
        ...ResultListQueryAppearance
      }
    }
  }
  ${ResultListQueryAppearanceFragmentDoc}
`;

/**
 * __useResultListScreenQuery__
 *
 * To run a query within a React component, call `useResultListScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useResultListScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResultListScreenQuery({
 *   variables: {
 *      contestId: // value for 'contestId'
 *      contestCategoryId: // value for 'contestCategoryId'
 *   },
 * });
 */
export function useResultListScreenQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ResultListScreenQuery,
    ResultListScreenQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    ResultListScreenQuery,
    ResultListScreenQueryVariables
  >(ResultListScreenDocument, baseOptions);
}
export function useResultListScreenLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ResultListScreenQuery,
    ResultListScreenQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ResultListScreenQuery,
    ResultListScreenQueryVariables
  >(ResultListScreenDocument, baseOptions);
}
export type ResultListScreenQueryHookResult = ReturnType<
  typeof useResultListScreenQuery
>;
export type ResultListScreenLazyQueryHookResult = ReturnType<
  typeof useResultListScreenLazyQuery
>;
export type ResultListScreenQueryResult = ApolloReactCommon.QueryResult<
  ResultListScreenQuery,
  ResultListScreenQueryVariables
>;
