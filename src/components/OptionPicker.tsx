import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

interface Props<T> {
  options: T[];
  formatOption: (option: T) => string;
  selectedOption: T;
  onSelectOption: (option: T) => void;
  style?: StyleProp<ViewStyle>;
}

const OptionPicker = <T extends {}>(props: Props<T>) => {
  const {
    options,
    formatOption,
    selectedOption,
    onSelectOption,
    style,
  } = props;

  return (
    <View style={[styles.root, style]}>
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
    paddingHorizontal: 15,
  },
  option: {
    borderBottomWidth: 2,
    alignItems: "center",
    flex: 1,
    paddingBottom: 5,
  },
  selectedOption: {
    borderBottomColor: "red",
  },
});

export default OptionPicker;
