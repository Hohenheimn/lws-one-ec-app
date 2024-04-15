import { View, Text } from "react-native";
import React from "react";
import Button from "./Button";
import { useRouter } from "expo-router";

type Props = {
  message: string;
};

const ScreenError = ({ message }: Props) => {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-poppins-sb font-semibold mb-4">
        {message}
      </Text>
      <Button
        title="Go Back"
        appearance="primary"
        className="w-1/2"
        onPress={() => router.back()}
      />
    </View>
  );
};

export default ScreenError;
