import { NavigationStackOptions } from "react-navigation-stack";

import colors from "./colors";
import textStyles from "./textStyles";

export const defaultNavigationOptions: NavigationStackOptions = {
  headerStyle: {
    backgroundColor: colors.brand,
    borderBottomWidth: 0,
  },
  headerTintColor: colors.white,
  headerTitleStyle: {
    ...textStyles.large,
    color: colors.white,
  },
  headerBackTitle: null,
};
