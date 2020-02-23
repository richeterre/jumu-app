import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import colors from "../constants/colors";

interface Props {
  style?: StyleProp<ViewStyle>;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  onPress: () => void;
}

const TextualButton: React.FC<Props> = props => {
  const { style, title, titleStyle, onPress } = props;

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.brand,
  },
});

export default TextualButton;
