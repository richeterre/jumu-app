import { StackNavigationOptions } from "@react-navigation/stack";

import colors from "./colors";
import textStyles from "./textStyles";

export const defaultStackScreenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.brand,
  },
  headerTintColor: colors.white,
  headerTitleStyle: {
    ...textStyles.large,
    color: colors.white,
  },
  headerBackTitleVisible: false,
};
