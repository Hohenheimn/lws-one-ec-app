import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  title: string;
  buttonClassname?: string;
  textClassname?: string;
  appearance: "primary" | "secondary" | "default";
  loading?: boolean;
};

type Props = ButtonProps & TouchableOpacityProps;

const Button = ({
  title,
  buttonClassname,
  textClassname,
  appearance,
  loading,
  ...rest
}: Props) => {
  return (
    <TouchableOpacity
      {...rest}
      className={twMerge(
        " flex items-center py-3 text-center rounded-lg",
        appearance === "primary" && "bg-primary",
        appearance === "secondary" && "bg-secondary ",
        buttonClassname
      )}
      disabled={loading}
    >
      <Text
        className={twMerge(
          "text-base font-medium",
          appearance === "secondary" && "text-white",
          textClassname
        )}
      >
        {loading ? <ActivityIndicator color={"black"} /> : title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
