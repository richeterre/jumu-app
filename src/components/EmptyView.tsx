import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../constants/colors";
import spacings from "../constants/spacings";
import textStyles from "../constants/textStyles";

interface Props {
  text: string;
}

const EmptyView: React.FC<Props> = ({ text }) => (
  <View style={styles.root}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: spacings.extraLarge,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...textStyles.large,
    color: colors.midGray,
    textAlign: "center",
  },
});

export default EmptyView;
