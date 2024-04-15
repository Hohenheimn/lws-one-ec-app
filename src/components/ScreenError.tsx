import { View, Text } from "react-native";
import React from "react";
import Button from "./Button";
import { useRouter } from "expo-router";

type Props = {
  message: string;
  description?: string;
};

const ScreenError = ({ message, description }: Props) => {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-poppins-sb font-semibold mb-4">
        {message}
      </Text>
      {description && (
        <Text className="text-lg font-poppins font-medium mb-4 text-center">
          {description}
        </Text>
      )}
      <Button
        title="Go Back"
        appearance="primary"
        className="w-full"
        onPress={() => router.back()}
      />
    </View>
  );
};

export default ScreenError;
