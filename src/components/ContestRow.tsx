import { first, last } from "lodash";
import { DateTime } from "luxon";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../constants/colors";
import textStyles from "../constants/textStyles";
import { ListContestFragment } from "../graphql/types/generated";
import { flags } from "../helpers/countries";

interface Props {
  contest: ListContestFragment;
  onPress: () => void;
}

const ContestRow: React.FC<Props> = ({ contest, onPress }) => (
  <TouchableOpacity style={styles.root} onPress={onPress}>
    <Text style={styles.name}>
      {`${flags(contest.host.countryCodes)} ${contest.name}`}
    </Text>
    <Text style={styles.dates}>{formatDateRange(contest.dates)}</Text>
  </TouchableOpacity>
);

const formatDateRange = (dates: string[]) => {
  const startDateISO = first(dates);
  const endDateISO = last(dates);
  if (!startDateISO || !endDateISO) return;

  const startDate = DateTime.fromISO(startDateISO);
  const endDate = DateTime.fromISO(endDateISO);

  const baseFormat = { day: "numeric", month: "long" };
  const formattedEndDate = endDate.toLocaleString(baseFormat);

  if (startDate.equals(endDate)) {
    return formattedEndDate;
  } else if (startDate.month === endDate.month) {
    return `${startDate.day}.–${formattedEndDate}`;
  } else {
    return `${startDate.toLocaleString(baseFormat)}–${formattedEndDate}`;
  }
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 15,
    paddingTop: 8,
    paddingBottom: 12,
  },
  name: {
    ...textStyles.large,
  },
  dates: {
    ...textStyles.medium,
    color: colors.midGray,
  },
});

export default ContestRow;
