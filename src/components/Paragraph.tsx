import React from "react";
import { Text } from "react-native";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  classname?: string;
};

const Paragraph = ({ children, classname }: Props) => {
  return (
    <Text className={twMerge("text-sm font-poppins", classname)}>
      {children}
    </Text>
  );
};

export default Paragraph;
