import React from "react";
import { Text } from "react-native";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  classname?: string;
  onPress?: () => void;
};

const Paragraph = ({ children, classname, onPress, ...rest }: Props) => {
  return (
    <Text
      onPress={onPress}
      className={twMerge("text-sm font-poppins whitespace-normal", classname)}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Paragraph;
