import { first, last } from "lodash";
import { DateTime, DateTimeFormatOptions } from "luxon";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import colors from "../constants/colors";
import spacings from "../constants/spacings";
import textStyles from "../constants/textStyles";
import { ListContestFragment as Contest } from "../graphql/types/generated";
import { flags } from "../helpers/countries";

interface Props {
  contest: Contest;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const ContestRow: React.FC<Props> = ({ contest, style, onPress }) => (
  <TouchableOpacity style={[styles.root, style]} onPress={onPress}>
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

  const baseFormat: DateTimeFormatOptions = { day: "numeric", month: "long" };
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
    paddingTop: spacings.medium - 4,
    paddingBottom: spacings.medium,
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
