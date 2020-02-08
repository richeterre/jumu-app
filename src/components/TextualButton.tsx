import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import colors from "../constants/colors";
import textStyles from "../constants/textStyles";

interface Props {
  style?: StyleProp<ViewStyle>;
  title: string;
  onPress: () => void;
}

const TextualButton: React.FC<Props> = props => {
  const { style, title, onPress } = props;

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    ...textStyles.extraLarge,
    fontWeight: "bold",
    color: colors.brand,
  },
});

export default TextualButton;
