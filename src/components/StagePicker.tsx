import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import colors from "../constants/colors";
import textStyles from "../constants/textStyles";
import { Stage } from "../graphql/types/generated";
import StagePickerOption from "./StagePickerOption";

interface Props {
  stages: Stage[];
  selectedStage: Stage;
  onSelectStage: (stage: Stage) => void;
  style?: StyleProp<ViewStyle>;
}

const StagePicker: React.FC<Props> = props => {
  const { stages, selectedStage, onSelectStage, style } = props;

  const allowsPicking = stages.length > 1;
  const needsCompactLayout = stages.length > 3;

  return (
    <View style={[styles.root, style]}>
      {stages.map(stage => (
        <StagePickerOption
          key={stage.id}
          isSelected={allowsPicking && stage === selectedStage}
          layout={needsCompactLayout ? "compact" : "normal"}
          stage={stage}
          onPress={allowsPicking ? () => onSelectStage(stage) : undefined}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
  },
  stage: {
    borderBottomWidth: 3,
    borderBottomColor: colors.lightGray,
    alignItems: "center",
    flex: 1,
    paddingBottom: 5,
  },
  selectedStage: {
    borderBottomColor: colors.brand,
  },
  stageName: {
    ...textStyles.medium,
  },
  selectedStageName: {
    color: colors.brand,
  },
});

export default StagePicker;
