import { Dimensions } from "react-native";

export const adaptive = (baseValue: number, reducedValue: number) => {
  const width = Dimensions.get("screen").width;
  return width <= 320 ? reducedValue : baseValue;
};
