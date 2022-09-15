import { indexOf } from "lodash";
import { DateTime } from "luxon";
import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import spacings from "../constants/spacings";
import textStyles from "../constants/textStyles";
import TextualButton from "./TextualButton";

interface Props {
  dates: string[];
  selectedDate: string;
  style?: StyleProp<ViewStyle>;
  onSelectDate: (date: string) => void;
}

const DatePicker: React.FC<Props> = props => {
  const { dates, selectedDate, style, onSelectDate } = props;

  const selectedDateIndex = indexOf(dates, selectedDate);

  const prevDate = selectedDateIndex > 0 ? dates[selectedDateIndex - 1] : null;

  const nextDate =
    selectedDateIndex < dates.length - 1 ? dates[selectedDateIndex + 1] : null;

  return (
    <View style={[styles.root, style]}>
      <View style={styles.container}>
        <View style={styles.prevButtonContainer}>
          {prevDate && (
            <TextualButton
              style={styles.prevNextButton}
              title="←"
              titleStyle={styles.prevNextButtonTitle}
              onPress={() => onSelectDate(prevDate)}
            />
          )}
        </View>
        <Text style={styles.selectedDate}>{formatDate(selectedDate)}</Text>
        <View style={styles.nextButtonContainer}>
          {nextDate && (
            <TextualButton
              style={styles.prevNextButton}
              title="→"
              titleStyle={styles.prevNextButtonTitle}
              onPress={() => onSelectDate(nextDate)}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const formatDate = (date: string) =>
  DateTime.fromISO(date).toLocaleString({
    month: "long",
    day: "numeric",
    weekday: "long",
  });

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: spacings.small,
  },
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  prevButtonContainer: {
    alignItems: "flex-start",
    flex: 1,
  },
  prevNextButton: {
    padding: spacings.small,
  },
  prevNextButtonTitle: {
    ...textStyles.extraLargeBold,
  },
  selectedDate: {
    ...textStyles.extraLarge,
  },
  nextButtonContainer: {
    alignItems: "flex-end",
    flex: 1,
  },
});

export default DatePicker;
