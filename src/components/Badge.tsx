import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

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
    backgroundColor: "green",
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Badge;
