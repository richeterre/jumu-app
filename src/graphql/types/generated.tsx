import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** 
 * The `Date` scalar type represents a date. The Date appears in a JSON
   * response as an ISO8601 formatted string.
 **/
  Date: string,
  /** 
 * The `Time` scalar type represents a time. The Time appears in a JSON
   * response as an ISO8601 formatted string.
 **/
  Time: string,
};

export type Appearance = {
   __typename?: 'Appearance',
  id: Scalars['ID'],
  /** The name of the participant's instrument in this appearance. */
  instrumentName: Scalars['String'],
  /** The full name of the appearance's participant. */
  participantName: Scalars['String'],
  /** The appearance's result, if publicly available. */
  result?: Maybe<Result>,
};

export type Contest = {
   __typename?: 'Contest',
  /** The contest categories offered at this contest. */
  contestCategories: Array<ContestCategory>,
  /** The country code of the contest's host. */
  countryCode: Scalars['String'],
  /** The dates on which the contest is happening. */
  dates: Array<Scalars['Date']>,
  id: Scalars['ID'],
  /** The contest’s name containing the round, year and host. */
  name: Scalars['String'],
  /** The stages used in this contest. */
  stages: Array<Stage>,
};

export type ContestCategory = {
   __typename?: 'ContestCategory',
  id: Scalars['ID'],
  /** The contest category's name. */
  name: Scalars['String'],
  /** The amount of performances with public results in this contest category. */
  publicResultCount: Scalars['Int'],
};


export type Host = {
   __typename?: 'Host',
  /** The country code of the host. */
  countryCode: Scalars['String'],
  id: Scalars['ID'],
  /** The name of the host. */
  name: Scalars['String'],
};

export type Performance = {
   __typename?: 'Performance',
  /** The performance's appearances. */
  appearances: Array<Appearance>,
  /** The performance's contest category and age group. */
  categoryInfo: Scalars['String'],
  id: Scalars['ID'],
  /** The performance's pieces. */
  pieces: Array<Piece>,
  /** The host of the performance's predecessor contest. */
  predecessorHost?: Maybe<Host>,
  /** The scheduled wall time of the performance. */
  stageTime: Scalars['Time'],
};

export type PerformanceFilter = {
  /** The date on which the performances are scheduled. */
  stageDate?: Maybe<Scalars['Date']>,
  /** The ID of the stage on which the performances happen. */
  stageId?: Maybe<Scalars['ID']>,
};

export type Piece = {
   __typename?: 'Piece',
  id: Scalars['ID'],
  /** 
 * For classical pieces, this contains the name and biographical dates of the piece's composer.
   * For popular pieces, the artist name is returned.
 **/
  personInfo: Scalars['String'],
  /** The title of the piece. */
  title: Scalars['String'],
};

export type Result = {
   __typename?: 'Result',
  /** Whether the participant will advance to the next round with this appearance. */
  advances: Scalars['Boolean'],
  /** The points awarded to this appearance. */
  points: Scalars['Int'],
  /** The prize corresponding to the appearance's points. */
  prize?: Maybe<Scalars['String']>,
};

export type RootQueryType = {
   __typename?: 'RootQueryType',
  /** The contests with public timetables. */
  contests: Array<Contest>,
  /** A single performance that's scheduled in a public contest. */
  performance?: Maybe<Performance>,
  /** The scheduled performances of a public contest. */
  performances?: Maybe<Array<Performance>>,
};


export type RootQueryTypePerformanceArgs = {
  id: Scalars['ID']
};


export type RootQueryTypePerformancesArgs = {
  contestId: Scalars['ID'],
  filter?: Maybe<PerformanceFilter>
};

export type Stage = {
   __typename?: 'Stage',
  id: Scalars['ID'],
  /** The public name of the stage. */
  name: Scalars['String'],
};

export type ListContestFragment = (
  { __typename?: 'Contest' }
  & Pick<Contest, 'id' | 'name' | 'countryCode' | 'dates'>
  & { stages: Array<(
    { __typename?: 'Stage' }
    & Pick<Stage, 'id' | 'name'>
  )> }
);

export type ContestQueryAppearanceFragment = (
  { __typename?: 'Appearance' }
  & Pick<Appearance, 'participantName' | 'instrumentName'>
);

export type ContestPickerModalQueryVariables = {};


export type ContestPickerModalQuery = (
  { __typename?: 'RootQueryType' }
  & { contests: Array<{ __typename?: 'Contest' }
    & ListContestFragment
  > }
);

export type ContestScreenQueryVariables = {
  contestId: Scalars['ID'],
  filter?: Maybe<PerformanceFilter>
};


export type ContestScreenQuery = (
  { __typename?: 'RootQueryType' }
  & { performances: Maybe<Array<(
    { __typename?: 'Performance' }
    & Pick<Performance, 'id' | 'stageTime' | 'categoryInfo'>
    & { appearances: Array<{ __typename?: 'Appearance' }
      & ContestQueryAppearanceFragment
    > }
  )>> }
);

export type LandingScreenQueryVariables = {};


export type LandingScreenQuery = (
  { __typename?: 'RootQueryType' }
  & { contests: Array<{ __typename?: 'Contest' }
    & ListContestFragment
  > }
);
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
  participantName
  instrumentName
}
    `;
export const ContestPickerModalDocument = gql`
    query ContestPickerModal {
  contests {
    ...ListContest
  }
}
    ${ListContestFragmentDoc}`;

    export function useContestPickerModalQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ContestPickerModalQuery, ContestPickerModalQueryVariables>) {
      return ApolloReactHooks.useQuery<ContestPickerModalQuery, ContestPickerModalQueryVariables>(ContestPickerModalDocument, baseOptions);
    }
      export function useContestPickerModalLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ContestPickerModalQuery, ContestPickerModalQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ContestPickerModalQuery, ContestPickerModalQueryVariables>(ContestPickerModalDocument, baseOptions);
      }
      
export type ContestPickerModalQueryHookResult = ReturnType<typeof useContestPickerModalQuery>;
export type ContestPickerModalQueryResult = ApolloReactCommon.QueryResult<ContestPickerModalQuery, ContestPickerModalQueryVariables>;
export const ContestScreenDocument = gql`
    query ContestScreen($contestId: ID!, $filter: PerformanceFilter) {
  performances(contestId: $contestId, filter: $filter) {
    id
    stageTime
    categoryInfo
    appearances {
      ...ContestQueryAppearance
    }
  }
}
    ${ContestQueryAppearanceFragmentDoc}`;

    export function useContestScreenQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ContestScreenQuery, ContestScreenQueryVariables>) {
      return ApolloReactHooks.useQuery<ContestScreenQuery, ContestScreenQueryVariables>(ContestScreenDocument, baseOptions);
    }
      export function useContestScreenLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ContestScreenQuery, ContestScreenQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ContestScreenQuery, ContestScreenQueryVariables>(ContestScreenDocument, baseOptions);
      }
      
export type ContestScreenQueryHookResult = ReturnType<typeof useContestScreenQuery>;
export type ContestScreenQueryResult = ApolloReactCommon.QueryResult<ContestScreenQuery, ContestScreenQueryVariables>;
export const LandingScreenDocument = gql`
    query LandingScreen {
  contests {
    ...ListContest
  }
}
    ${ListContestFragmentDoc}`;

    export function useLandingScreenQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LandingScreenQuery, LandingScreenQueryVariables>) {
      return ApolloReactHooks.useQuery<LandingScreenQuery, LandingScreenQueryVariables>(LandingScreenDocument, baseOptions);
    }
      export function useLandingScreenLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LandingScreenQuery, LandingScreenQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<LandingScreenQuery, LandingScreenQueryVariables>(LandingScreenDocument, baseOptions);
      }
      
export type LandingScreenQueryHookResult = ReturnType<typeof useLandingScreenQuery>;
export type LandingScreenQueryResult = ApolloReactCommon.QueryResult<LandingScreenQuery, LandingScreenQueryVariables>;