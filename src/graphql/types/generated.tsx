import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Date` scalar type represents a date. The Date appears in a JSON
   * response as an ISO8601 formatted string.
   */
  Date: any;
  /** The `Time` scalar type represents a time. The Time appears in a JSON
   * response as an ISO8601 formatted string.
   */
  Time: any;
};

export type Appearance = {
  __typename?: "Appearance";
  id: Scalars["ID"];
  /** The name of the participant's instrument in this appearance. */
  instrumentName: Scalars["String"];
  /** The full name of the appearance's participant. */
  participantName: Scalars["String"];
};

export type Contest = {
  __typename?: "Contest";
  /** The country code of the contest's host. */
  countryCode: Scalars["String"];
  /** The dates on which the contest is happening. */
  dates: Array<Scalars["Date"]>;
  /** The last day of the contest. */
  endDate: Scalars["Date"];
  id: Scalars["ID"];
  /** The contest’s name containing the round, year and host. */
  name: Scalars["String"];
  /** The stages used in this contest. */
  stages: Array<Stage>;
  /** The first day of the contest. */
  startDate: Scalars["Date"];
};

export type Performance = {
  __typename?: "Performance";
  /** The performance's appearances. */
  appearances: Array<Appearance>;
  /** The performance's contest category and age group. */
  categoryInfo: Scalars["String"];
  id: Scalars["ID"];
  /** The scheduled wall time of the performance. */
  stageTime: Scalars["Time"];
};

export type PerformanceFilter = {
  stageDate?: Maybe<Scalars["Date"]>;
  stageId?: Maybe<Scalars["ID"]>;
};

export type RootQueryType = {
  __typename?: "RootQueryType";
  /** The contests with public timetables. */
  contests: Array<Contest>;
  /** The performances of a contest. */
  performances?: Maybe<Array<Performance>>;
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

export type ContestQueryAppearanceFragment = {
  __typename?: "Appearance";
} & Pick<Appearance, "participantName" | "instrumentName">;

export type ContestPickerQueryVariables = {};

export type ContestPickerQuery = { __typename?: "RootQueryType" } & {
  contests: Array<
    { __typename?: "Contest" } & Pick<
      Contest,
      "id" | "name" | "countryCode" | "dates"
    > & { stages: Array<{ __typename?: "Stage" } & Pick<Stage, "id" | "name">> }
  >;
};

export type ContestQueryQueryVariables = {
  contestId: Scalars["ID"];
  filter?: Maybe<PerformanceFilter>;
};

export type ContestQueryQuery = { __typename?: "RootQueryType" } & {
  performances: Maybe<
    Array<
      { __typename?: "Performance" } & Pick<
        Performance,
        "id" | "stageTime" | "categoryInfo"
      > & {
          appearances: Array<
            { __typename?: "Appearance" } & ContestQueryAppearanceFragment
          >;
        }
    >
  >;
};
export const ContestQueryAppearanceFragmentDoc = gql`
  fragment ContestQueryAppearance on Appearance {
    participantName
    instrumentName
  }
`;
export const ContestPickerDocument = gql`
  query ContestPicker {
    contests {
      id
      name
      countryCode
      dates
      stages {
        id
        name
      }
    }
  }
`;
export type ContestPickerComponentProps = Omit<
  ReactApollo.QueryProps<ContestPickerQuery, ContestPickerQueryVariables>,
  "query"
>;

export const ContestPickerComponent = (props: ContestPickerComponentProps) => (
  <ReactApollo.Query<ContestPickerQuery, ContestPickerQueryVariables>
    query={ContestPickerDocument}
    {...props}
  />
);

export const ContestQueryDocument = gql`
  query ContestQuery($contestId: ID!, $filter: PerformanceFilter) {
    performances(contestId: $contestId, filter: $filter) {
      id
      stageTime
      categoryInfo
      appearances {
        ...ContestQueryAppearance
      }
    }
  }
  ${ContestQueryAppearanceFragmentDoc}
`;
export type ContestQueryComponentProps = Omit<
  ReactApollo.QueryProps<ContestQueryQuery, ContestQueryQueryVariables>,
  "query"
> &
  ({ variables: ContestQueryQueryVariables; skip?: false } | { skip: true });

export const ContestQueryComponent = (props: ContestQueryComponentProps) => (
  <ReactApollo.Query<ContestQueryQuery, ContestQueryQueryVariables>
    query={ContestQueryDocument}
    {...props}
  />
);
