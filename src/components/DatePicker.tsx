import { DateTime } from "luxon";
import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Modal from "react-native-modal";

import colors from "../constants/colors";
import TextualButton from "./TextualButton";

interface Props {
  dates: string[];
  selectedDate: string;
  style?: StyleProp<ViewStyle>;
  onSelectDate: (date: string) => void;
}

const DatePicker: React.FC<Props> = props => {
  const { dates, selectedDate, style, onSelectDate } = props;

  const [modalPickerVisible, setModalPickerVisible] = useState(false);

  const pickDate = (date: string) => {
    onSelectDate(date);
    setModalPickerVisible(false);
  };

  return (
    <View style={[styles.root, style]}>
      <View style={styles.container}>
        <TextualButton
          title={formatDate(selectedDate)}
          onPress={() => setModalPickerVisible(true)}
        />
      </View>

      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={modalPickerVisible}
        onBackdropPress={() => setModalPickerVisible(false)}
      >
        <View style={styles.modalPicker}>
          {dates.map(date => (
            <TouchableOpacity key={date} onPress={() => pickDate(date)}>
              <Text style={styles.modalPickerDate}>{formatDate(date)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
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
    paddingHorizontal: 15,
  },
  container: {
    flexDirection: "row",
    alignItems: "baseline",
    flex: 1,
    justifyContent: "center",
  },
  modalPicker: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
  },
  modalPickerDate: {
    marginVertical: 10,
  },
});

export default DatePicker;
