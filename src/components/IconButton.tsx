import React from "react";
import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";

interface Props {
  source: ImageSourcePropType;
  tintColor: string;
  onPress: () => void;
}

const IconButton: React.FC<Props> = props => {
  const { source, tintColor, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={source} style={{ tintColor }} />
    </TouchableOpacity>
  );
};

export default IconButton;
