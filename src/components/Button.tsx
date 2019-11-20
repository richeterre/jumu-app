import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";

import colors from "../constants/colors";
import textStyles from "../constants/textStyles";

interface Props {
  title: string;
  onPress: () => void;
}

const Button: React.FC<Props> = props => {
  const { title, onPress } = props;

  const [active, setActive] = useState(false);

  return (
    <TouchableHighlight
      style={styles.root}
      onPress={onPress}
      underlayColor={colors.brand}
      activeOpacity={1}
      onShowUnderlay={() => setActive(true)}
      onHideUnderlay={() => setActive(false)}
    >
      <Text style={[styles.text, active && styles.activeText]}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: colors.brand,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  text: {
    ...textStyles.medium,
    color: colors.brand,
  },
  activeText: {
    color: colors.white,
  },
});

export default Button;
