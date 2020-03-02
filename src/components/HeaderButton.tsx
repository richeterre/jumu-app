import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import dropdownIcon from "../../assets/images/icon-dropdown.png";
import colors from "../constants/colors";
import textStyles from "../constants/textStyles";

interface Props {
  title: string;
  onPress: () => void;
}

const HeaderButton: React.FC<Props> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.root} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
    <Image source={dropdownIcon} style={styles.dropdownIcon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    ...textStyles.largeBold,
    color: colors.white,
  },
  dropdownIcon: {
    tintColor: colors.white,
    marginLeft: 4,
    marginTop: 2,
  },
});

export default HeaderButton;
