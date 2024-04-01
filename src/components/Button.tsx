import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from "react-native";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  title: string;
  buttonClassname?: string;
  textClassname?: string;
  appearance: "primary" | "secondary" | "default";
};

type Props = ButtonProps & TouchableOpacityProps;

const Button = ({
  title,
  buttonClassname,
  textClassname,
  appearance,
  ...rest
}: Props) => {
  return (
    <TouchableOpacity
      {...rest}
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
