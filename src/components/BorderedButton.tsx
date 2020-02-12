import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";

import colors from "../constants/colors";
import textStyles from "../constants/textStyles";

interface Props {
  title: string;
  onPress: () => void;
}

const BorderedButton: React.FC<Props> = props => {
  const { title, onPress } = props;

  const [active, setActive] = useState(false);

  return (
    <TouchableHighlight
      activeOpacity={1}
      style={styles.root}
      underlayColor={colors.brand}
      onHideUnderlay={() => setActive(false)}
      onPress={onPress}
      onShowUnderlay={() => setActive(true)}
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

export default BorderedButton;
