import React from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  title: string;
  buttonClassname?: string;
  textClassname?: string;
  appearance: "primary" | "secondary" | "default" | "link";
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
        "flex items-center text-center rounded-lg",
        appearance === "primary" && "bg-primary py-3",
        appearance === "secondary" && "bg-secondary py-3",
        appearance === "link" && "bg-transparent p-0",
        buttonClassname
      )}
      disabled={loading}
    >
      <Text
        className={twMerge(
          "text-base font-medium font-poppins-md",
          appearance === "secondary" && "text-white",
          appearance === "link" && "text-primary",
          textClassname
        )}
      >
        {loading ? <ActivityIndicator color={"black"} /> : title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
