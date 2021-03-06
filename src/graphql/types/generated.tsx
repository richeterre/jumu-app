import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
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
  ageGroup: Scalars["String"];
  id: Scalars["ID"];
  instrumentName: Scalars["String"];
  isAccompanist: Scalars["Boolean"];
  participantName: Scalars["String"];
  result: Maybe<Result>;
};

export type Contest = {
  __typename?: "Contest";
  dates: Array<Scalars["Date"]>;
  host: Host;
  id: Scalars["ID"];
  name: Scalars["String"];
  stages: Array<Stage>;
};

export type ContestCategory = {
  __typename?: "ContestCategory";
  id: Scalars["ID"];
  name: Scalars["String"];
  publicResultCount: Scalars["Int"];
};

export type Host = {
  __typename?: "Host";
  countryCodes: Array<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Performance = {
  __typename?: "Performance";
  ageGroup: Scalars["String"];
  appearances: Array<Appearance>;
  categoryName: Scalars["String"];
  id: Scalars["ID"];
  pieces: Array<Piece>;
  predecessorHost: Maybe<Host>;
  stageDate: Scalars["Date"];
  stageTime: Scalars["Time"];
};

export type PerformanceFilter = {
  contestCategoryId?: Maybe<Scalars["ID"]>;
  resultsPublic?: Maybe<Scalars["Boolean"]>;
  stageDate?: Maybe<Scalars["Date"]>;
  stageId?: Maybe<Scalars["ID"]>;
};

export type Piece = {
  __typename?: "Piece";
  id: Scalars["ID"];
  personInfo: Scalars["String"];
  title: Scalars["String"];
};

export type Result = {
  __typename?: "Result";
  advances: Scalars["Boolean"];
  points: Scalars["Int"];
  prize: Maybe<Scalars["String"]>;
};

export type RootQueryType = {
  __typename?: "RootQueryType";
  contestCategories: Maybe<Array<ContestCategory>>;
  contests: Array<Contest>;
  featuredContests: Array<Contest>;
  performance: Maybe<Performance>;
  performances: Maybe<Array<Performance>>;
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
  filter: Maybe<PerformanceFilter>;
};

export type Stage = {
  __typename?: "Stage";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type ListContestFragment = { __typename?: "Contest" } & Pick<
  Contest,
  "id" | "name" | "dates"
> & {
    host: { __typename?: "Host" } & Pick<Host, "id" | "countryCodes">;
    stages: Array<{ __typename?: "Stage" } & Pick<Stage, "id" | "name">>;
  };

export type PerformanceListAppearanceFragment = {
  __typename?: "Appearance";
} & Pick<Appearance, "id" | "participantName" | "instrumentName">;

export type PredecessorHostFragment = { __typename?: "Host" } & Pick<
  Host,
  "id" | "name" | "countryCodes"
>;

export type ListPerformanceFragment = { __typename?: "Performance" } & Pick<
  Performance,
  "id" | "stageTime" | "categoryName" | "ageGroup"
> & {
    appearances: Array<
      { __typename?: "Appearance" } & PerformanceListAppearanceFragment
    >;
    predecessorHost: Maybe<{ __typename?: "Host" } & PredecessorHostFragment>;
  };

export type PerformanceAppearanceFragment = {
  __typename?: "Appearance";
} & Pick<
  Appearance,
  "id" | "participantName" | "instrumentName" | "isAccompanist" | "ageGroup"
>;

export type PerformancePieceFragment = { __typename?: "Piece" } & Pick<
  Piece,
  "id" | "personInfo" | "title"
>;

export type ResultListAppearanceFragment = { __typename?: "Appearance" } & Pick<
  Appearance,
  "id" | "participantName" | "instrumentName"
> & {
    result: Maybe<
      { __typename?: "Result" } & Pick<Result, "points" | "prize" | "advances">
    >;
  };

export type ContestPickerModalQueryVariables = {};

export type ContestPickerModalQuery = { __typename?: "RootQueryType" } & {
  contests: Array<{ __typename?: "Contest" } & ListContestFragment>;
};

export type LandingQueryVariables = {};

export type LandingQuery = { __typename?: "RootQueryType" } & {
  contests: Array<{ __typename?: "Contest" } & ListContestFragment>;
};

export type PerformanceListQueryVariables = {
  contestId: Scalars["ID"];
  filter?: Maybe<PerformanceFilter>;
};

export type PerformanceListQuery = { __typename?: "RootQueryType" } & {
  performances: Maybe<
    Array<{ __typename?: "Performance" } & ListPerformanceFragment>
  >;
};

export type PerformanceQueryVariables = {
  id: Scalars["ID"];
};

export type PerformanceQuery = { __typename?: "RootQueryType" } & {
  performance: Maybe<
    { __typename?: "Performance" } & Pick<
      Performance,
      "id" | "stageDate" | "stageTime" | "categoryName" | "ageGroup"
    > & {
        appearances: Array<
          { __typename?: "Appearance" } & PerformanceAppearanceFragment
        >;
        predecessorHost: Maybe<
          { __typename?: "Host" } & PredecessorHostFragment
        >;
        pieces: Array<{ __typename?: "Piece" } & PerformancePieceFragment>;
      }
  >;
};

export type ResultGroupListQueryVariables = {
  contestId: Scalars["ID"];
};

export type ResultGroupListQuery = { __typename?: "RootQueryType" } & {
  contestCategories: Maybe<
    Array<
      { __typename?: "ContestCategory" } & Pick<
        ContestCategory,
        "id" | "name" | "publicResultCount"
      >
    >
  >;
};

export type ResultListQueryVariables = {
  contestId: Scalars["ID"];
  contestCategoryId: Scalars["ID"];
};

export type ResultListQuery = { __typename?: "RootQueryType" } & {
  performances: Maybe<
    Array<
      { __typename?: "Performance" } & Pick<Performance, "id" | "ageGroup"> & {
          appearances: Array<
            { __typename?: "Appearance" } & ResultListAppearanceFragment
          >;
          predecessorHost: Maybe<
            { __typename?: "Host" } & PredecessorHostFragment
          >;
        }
    >
  >;
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    LandingQuery,
    LandingQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<LandingQuery, LandingQueryVariables>(
    LandingDocument,
    baseOptions
  );
}
export function useLandingLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    LandingQuery,
    LandingQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<LandingQuery, LandingQueryVariables>(
    LandingDocument,
    baseOptions
  );
}
export type LandingQueryHookResult = ReturnType<typeof useLandingQuery>;
export type LandingLazyQueryHookResult = ReturnType<typeof useLandingLazyQuery>;
export type LandingQueryResult = ApolloReactCommon.QueryResult<
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PerformanceListQuery,
    PerformanceListQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    PerformanceListQuery,
    PerformanceListQueryVariables
  >(PerformanceListDocument, baseOptions);
}
export function usePerformanceListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PerformanceListQuery,
    PerformanceListQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    PerformanceListQuery,
    PerformanceListQueryVariables
  >(PerformanceListDocument, baseOptions);
}
export type PerformanceListQueryHookResult = ReturnType<
  typeof usePerformanceListQuery
>;
export type PerformanceListLazyQueryHookResult = ReturnType<
  typeof usePerformanceListLazyQuery
>;
export type PerformanceListQueryResult = ApolloReactCommon.QueryResult<
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PerformanceQuery,
    PerformanceQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<PerformanceQuery, PerformanceQueryVariables>(
    PerformanceDocument,
    baseOptions
  );
}
export function usePerformanceLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PerformanceQuery,
    PerformanceQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    PerformanceQuery,
    PerformanceQueryVariables
  >(PerformanceDocument, baseOptions);
}
export type PerformanceQueryHookResult = ReturnType<typeof usePerformanceQuery>;
export type PerformanceLazyQueryHookResult = ReturnType<
  typeof usePerformanceLazyQuery
>;
export type PerformanceQueryResult = ApolloReactCommon.QueryResult<
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ResultGroupListQuery,
    ResultGroupListQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    ResultGroupListQuery,
    ResultGroupListQueryVariables
  >(ResultGroupListDocument, baseOptions);
}
export function useResultGroupListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ResultGroupListQuery,
    ResultGroupListQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ResultGroupListQuery,
    ResultGroupListQueryVariables
  >(ResultGroupListDocument, baseOptions);
}
export type ResultGroupListQueryHookResult = ReturnType<
  typeof useResultGroupListQuery
>;
export type ResultGroupListLazyQueryHookResult = ReturnType<
  typeof useResultGroupListLazyQuery
>;
export type ResultGroupListQueryResult = ApolloReactCommon.QueryResult<
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ResultListQuery,
    ResultListQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<ResultListQuery, ResultListQueryVariables>(
    ResultListDocument,
    baseOptions
  );
}
export function useResultListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ResultListQuery,
    ResultListQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ResultListQuery,
    ResultListQueryVariables
  >(ResultListDocument, baseOptions);
}
export type ResultListQueryHookResult = ReturnType<typeof useResultListQuery>;
export type ResultListLazyQueryHookResult = ReturnType<
  typeof useResultListLazyQuery
>;
export type ResultListQueryResult = ApolloReactCommon.QueryResult<
  ResultListQuery,
  ResultListQueryVariables
>;
