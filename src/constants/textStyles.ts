import { StyleSheet } from "react-native";

import { adaptive } from "../helpers/layout";

const fontFamily = "Lato";

export default StyleSheet.create({
  extraSmall: {
    fontFamily,
    fontSize: adaptive(12, 11),
  },
  small: {
    fontFamily,
    fontSize: adaptive(14, 12),
  },
  medium: {
    fontFamily,
    fontSize: adaptive(16, 14),
  },
  large: {
    fontFamily,
    fontSize: adaptive(18, 16),
  },
  extraLarge: {
    fontFamily,
    fontSize: adaptive(24, 20),
  },
});
