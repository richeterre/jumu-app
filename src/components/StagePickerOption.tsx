import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../constants/colors";
import textStyles from "../constants/textStyles";
import { Stage } from "../graphql/types/generated";

interface Props {
  isSelected: boolean;
  stage: Stage;
  onPress: () => void;
}

const StagePickerOption: React.FC<Props> = props => {
  const { isSelected, stage, onPress } = props;

  const [isPressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.root,
        isSelected && styles.selectedRoot,
        isPressed && styles.pressedRoot,
      ]}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <Text
        style={[
          styles.title,
          isSelected && styles.selectedTitle,
          isPressed && styles.pressedTitle,
        ]}
      >
        {stage.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    borderBottomWidth: 3,
    borderBottomColor: colors.lightGray,
    alignItems: "center",
    flex: 1,
    paddingVertical: 5,
  },
  selectedRoot: {
    borderBottomColor: colors.brand,
  },
  pressedRoot: {
    borderBottomColor: colors.lightenedBrand,
  },
  title: {
    ...textStyles.medium,
  },
  selectedTitle: {
    color: colors.brand,
  },
  pressedTitle: {
    color: colors.lightenedBrand,
  },
});

export default StagePickerOption;
