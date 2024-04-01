import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { twMerge } from "tailwind-merge";

type Props = {
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onLongPress?: () => void;
  title: string;
  buttonClassname?: string;
  textClassname?: string;
  appearance: "primary" | "secondary" | "default";
};

const Button = ({
  onPress,
  title,
  buttonClassname,
  textClassname,
  appearance,
  onPressIn,
  onPressOut,
  onLongPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      className={twMerge(
        " flex items-center py-3 bg-primary text-center rounded-lg",
        buttonClassname
      )}
    >
      <Text className={twMerge("text-base font-medium", textClassname)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
