import { RouteProp } from "@react-navigation/native";
import { gql } from "@apollo/client";
import { partition } from "lodash";
import { DateTime } from "luxon";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import calendarIcon from "../../assets/images/icon-calendar.png";
import clockIcon from "../../assets/images/icon-clock.png";
import markerIcon from "../../assets/images/icon-marker.png";
import Divider from "../components/Divider";
import colors from "../constants/colors";
import spacings from "../constants/spacings";
import textStyles from "../constants/textStyles";
import {
  PerformanceAppearance,
  PerformancePiece,
  PredecessorHost,
} from "../graphql/documents/fragments";
import {
  PerformanceAppearanceFragment,
  PerformancePieceFragment,
  usePerformanceQuery,
} from "../graphql/types/generated";
import { formatHost } from "../helpers/hosts";
import { TimetableStackParamList } from "../navigation/ContestNavigator";

gql`
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
  ${PerformanceAppearance}
  ${PerformancePiece}
  ${PredecessorHost}
`;

interface Props {
  route: RouteProp<TimetableStackParamList, "Performance">;
}

const PerformanceScreen: React.FC<Props> = ({ route }) => {
  const { id, stage } = route.params;

  const { data } = usePerformanceQuery({
    variables: { id },
  });

  if (!data?.performance) return null;

  const {
    categoryName,
    ageGroup,
    stageDate,
    stageTime,
    appearances,
    predecessorHost,
    pieces,
  } = data.performance;

  const renderAppearance = (appearance: PerformanceAppearanceFragment) => {
    const { id, participantName, instrumentName, isAccompanist } = appearance;

    // Append age group info for divergent age groups
    const ageGroupInfo =
      appearance.ageGroup !== ageGroup ? ` (AG ${appearance.ageGroup})` : "";

    const roleStyle = isAccompanist && styles.accompanistAppearance;

    return (
      <Text key={id} style={[styles.appearance, roleStyle]}>
        {`${participantName}, ${instrumentName}${ageGroupInfo}`}
      </Text>
    );
  };

  const renderPiece = (piece: PerformancePieceFragment) => {
    const { id, personInfo, title } = piece;

    return (
      <View key={id} style={styles.piece}>
        <Text style={styles.piecePersonInfo}>{personInfo}</Text>
        <Text style={styles.pieceTitle}>{title}</Text>
      </View>
    );
  };

  const [acc, nonAcc] = partition(appearances, a => a.isAccompanist);

  return (
    <ScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={styles.scrollViewContainer}
    >
      <Text style={styles.categoryName}>{categoryName}</Text>
      <Text style={styles.ageGroup}>Altersgruppe {ageGroup}</Text>

      <View style={styles.iconRow}>
        <Image source={calendarIcon} />
        <Text style={styles.iconRowText}>{formatDate(stageDate)}</Text>
      </View>
      <View style={styles.iconRow}>
        <Image source={clockIcon} />
        <Text style={styles.iconRowText}>{formatTime(stageTime)}</Text>
      </View>
      <View style={styles.iconRow}>
        <Image source={markerIcon} />
        <Text style={styles.iconRowText}>{stage.name}</Text>
      </View>

      <Divider style={styles.divider} />

      {nonAcc.map(renderAppearance)}

      {!!acc.length && (
        <Text style={styles.accompanistIntro}>begleitet von</Text>
      )}
      {acc.map(renderAppearance)}

      {predecessorHost && (
        <Text style={styles.predecessorHostInfo}>
          {formatHost(predecessorHost)}
        </Text>
      )}

      <Divider style={styles.divider} />

      {pieces.map(renderPiece)}
    </ScrollView>
  );
};

const formatDate = (date: string) =>
  DateTime.fromISO(date).toLocaleString({
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

const formatTime = (time: string) =>
  DateTime.fromISO(time).toLocaleString({
    hour: "numeric",
    minute: "numeric",
  });

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: spacings.large,
    paddingBottom: spacings.small,
  },
  categoryName: {
    ...textStyles.large,
    fontWeight: "bold",
  },
  ageGroup: {
    ...textStyles.large,
    marginBottom: spacings.large,
  },
  iconRow: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 4,
  },
  iconRowText: {
    ...textStyles.medium,
    marginLeft: 6,
  },
  divider: {
    alignSelf: "center",
    marginVertical: 16,
    marginLeft: 0,
    width: "67%",
  },
  appearance: {
    ...textStyles.medium,
    fontWeight: "bold",
  },
  accompanistAppearance: {
    fontWeight: "normal",
  },
  accompanistIntro: {
    ...textStyles.small,
    color: colors.midGray,
    marginTop: 8,
  },
  predecessorHostInfo: {
    ...textStyles.medium,
    marginTop: 3,
  },
  piece: {
    marginBottom: 8,
  },
  piecePersonInfo: {
    ...textStyles.medium,
    fontWeight: "bold",
  },
  pieceTitle: {
    ...textStyles.medium,
  },
});

export default PerformanceScreen;
