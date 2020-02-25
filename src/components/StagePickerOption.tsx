import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../constants/colors";
import textStyles from "../constants/textStyles";
import { Stage } from "../graphql/types/generated";

interface Props {
  isSelected: boolean;
  layout: "compact" | "normal";
  stage: Stage;
  onPress?: () => void;
}

const StagePickerOption: React.FC<Props> = props => {
  const { isSelected, layout, stage, onPress } = props;

  const [isPressed, setPressed] = useState(false);

  const titleStyle =
    layout === "compact" ? textStyles.medium : textStyles.large;

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!onPress}
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
          titleStyle,
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
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: colors.lightGray,
    flex: 1,
    justifyContent: "center",
    paddingVertical: 6,
  },
  selectedRoot: {
    borderBottomColor: colors.brand,
  },
  pressedRoot: {
    borderBottomColor: colors.lightenedBrand,
  },
  selectedTitle: {
    color: colors.brand,
  },
  pressedTitle: {
    color: colors.lightenedBrand,
  },
});

export default StagePickerOption;
