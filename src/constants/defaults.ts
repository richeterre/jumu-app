import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import colors from "./colors";
import textStyles from "./textStyles";

export const defaultStackScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.brand,
  },
  headerTintColor: colors.white,
  headerTitleStyle: {
    ...textStyles.large,
    color: colors.white,
  },
  headerBackTitleVisible: false,
  contentStyle: {
    backgroundColor: colors.white,
  },
};
