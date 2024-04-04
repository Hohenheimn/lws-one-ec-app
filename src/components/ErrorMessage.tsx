import React from "react";
import { Text } from "react-native";

type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  return (
    <>
      {message && (
        <Text className=" mb-5 text-red-500 text-base">{message}</Text>
      )}
    </>
  );
};

export default ErrorMessage;
