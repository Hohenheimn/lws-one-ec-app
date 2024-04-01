import React from "react";
import { Text } from "react-native";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  size: "large" | "medium";
  classname?: string;
};

const Heading = ({ children, size, classname }: Props) => {
  return (
    <Text
      className={twMerge(
        `${size === "large" && " text-2xl"}  ${
          size === "medium" && " text-xl"
        } font-bold`,
        classname
      )}
    >
      {children}
    </Text>
  );
};

export default Heading;
