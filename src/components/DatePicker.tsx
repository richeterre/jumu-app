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
import Button from "./Button";

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
      <Button
        title={selectedDate}
        onPress={() => setModalPickerVisible(true)}
      />

      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={modalPickerVisible}
        onBackdropPress={() => setModalPickerVisible(false)}
      >
        <View style={styles.modalPicker}>
          {dates.map(date => (
            <TouchableOpacity key={date} onPress={() => pickDate(date)}>
              <Text style={styles.modalPickerDate}>{date}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
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
