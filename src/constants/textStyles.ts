import { StyleSheet } from "react-native";

import { adaptive } from "../helpers/layout";

const fontFamily = {
  regular: "Lato-Regular",
  bold: "Lato-Bold",
};

const fontSize = {
  extraSmall: adaptive(12, 11),
  small: adaptive(14, 12),
  medium: adaptive(16, 14),
  large: adaptive(18, 16),
  extraLarge: adaptive(24, 20),
};

export default StyleSheet.create({
  extraSmall: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.extraSmall,
  },
  small: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.small,
  },
  smallBold: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.small,
  },
  medium: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.medium,
  },
  mediumBold: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.medium,
  },
  large: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.large,
  },
  largeBold: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.large,
  },
  extraLarge: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.extraLarge,
  },
  extraLargeBold: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.extraLarge,
  },
});
