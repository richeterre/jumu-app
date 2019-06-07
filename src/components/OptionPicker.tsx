import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface Props<T> {
  options: T[];
  formatOption: (option: T) => string;
  selectedOption: T;
  onSelectOption: (option: T) => void;
}

const OptionPicker = <T extends {}>(props: Props<T>) => {
  const { options, formatOption, selectedOption, onSelectOption } = props;

  return (
    <View style={styles.root}>
      {options.map((option, index) => {
        const selectedStyle =
          option === selectedOption ? styles.selectedOption : undefined;

        return (
          <TouchableOpacity
            key={index}
            style={[styles.option, selectedStyle]}
            onPress={() => onSelectOption(option)}
          >
            <Text>{formatOption(option)}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  },
  option: {
    borderBottomWidth: 2,
    paddingBottom: 5
  },
  selectedOption: {
    borderBottomColor: "red"
  }
});

export default OptionPicker;
