import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import colors from "../constants/colors";
import textStyles from "../constants/textStyles";
import { Stage } from "../graphql/types/generated";

interface Props {
  stages: Stage[];
  selectedStage: Stage;
  onSelectStage: (stage: Stage) => void;
  style?: StyleProp<ViewStyle>;
}

const StagePicker: React.FC<Props> = props => {
  const { stages, selectedStage, onSelectStage, style } = props;

  return (
    <View style={[styles.root, style]}>
      {stages.map((stage, index) => {
        const selectedStyle =
          stage === selectedStage ? styles.selectedStage : undefined;

        return (
          <TouchableOpacity
            key={index}
            style={[styles.stage, selectedStyle]}
            onPress={() => onSelectStage(stage)}
          >
            <Text style={styles.stageName}>{stage.name}</Text>
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
  stage: {
    borderBottomWidth: 2,
    alignItems: "center",
    flex: 1,
    paddingBottom: 5,
  },
  selectedStage: {
    borderBottomColor: colors.brand,
  },
  stageName: {
    ...textStyles.small,
  },
});

export default StagePicker;
