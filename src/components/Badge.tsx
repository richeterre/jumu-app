import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import colors from "../constants/colors";
import textStyles from "../constants/textStyles";

interface Props {
  style?: StyleProp<ViewStyle>;
  text: string;
}

const Badge: React.FC<Props> = props => {
  const { style, text } = props;

  return (
    <View style={[styles.root, style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.success,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  text: {
    ...textStyles.smallBold,
    color: colors.white,
    textAlign: "center",
  },
});

export default Badge;
