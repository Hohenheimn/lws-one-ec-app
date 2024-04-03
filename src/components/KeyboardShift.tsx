import * as React from "react";
import { KeyboardAvoidingView } from "react-native";
import { twMerge } from "tailwind-merge";
import { useHeaderHeight } from "@react-navigation/elements";

type Props = {
  children: React.ReactNode;
  classname: string;
};

export const KeyboardShift = ({ children, classname }: Props) => {
  return (
    <KeyboardAvoidingView
      //   keyboardVerticalOffset={47}
      behavior="padding"
      className={twMerge(classname, "flex-1")}
      enabled
    >
      {children}
    </KeyboardAvoidingView>
  );
};
