import * as React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  classname: string;
};

export const KeyboardShift = ({ children, classname }: Props) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={40}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={twMerge(classname, "flex-1")}
      enabled
    >
      {children}
    </KeyboardAvoidingView>
  );
};
