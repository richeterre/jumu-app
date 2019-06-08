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
};

export type Contest = {
  __typename?: "Contest";
  /** The country code of the contest's host. */
  countryCode: Scalars["String"];
  dates: Array<Scalars["Date"]>;
  /** The last day of the contest. */
  endDate: Scalars["Date"];
  id: Scalars["ID"];
  /** The contest’s name containing the round, year and host. */
  name: Scalars["String"];
  stages: Array<Stage>;
  /** The first day of the contest. */
  startDate: Scalars["Date"];
};

export type Performance = {
  __typename?: "Performance";
  /** The performance's appearances. */
  appearances: Array<Scalars["String"]>;
  /** The performance's contest category and age group. */
  categoryInfo: Scalars["String"];
  id: Scalars["ID"];
  stageTime: Scalars["String"];
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
  performances: Array<Performance>;
};

export type RootQueryTypePerformancesArgs = {
  contestId: Scalars["ID"];
  filter?: Maybe<PerformanceFilter>;
};

export type Stage = {
  __typename?: "Stage";
  id: Scalars["ID"];
  name: Scalars["String"];
};
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
  performances: Array<
    { __typename?: "Performance" } & Pick<
      Performance,
      "id" | "stageTime" | "categoryInfo" | "appearances"
    >
  >;
};

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
  Omit<
    ReactApollo.QueryProps<ContestPickerQuery, ContestPickerQueryVariables>,
    "query"
  >,
  "variables"
> & { variables?: ContestPickerQueryVariables };

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
      appearances
    }
  }
`;
export type ContestQueryComponentProps = Omit<
  Omit<
    ReactApollo.QueryProps<ContestQueryQuery, ContestQueryQueryVariables>,
    "query"
  >,
  "variables"
> & { variables: ContestQueryQueryVariables };

export const ContestQueryComponent = (props: ContestQueryComponentProps) => (
  <ReactApollo.Query<ContestQueryQuery, ContestQueryQueryVariables>
    query={ContestQueryDocument}
    {...props}
  />
);
