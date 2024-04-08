import { View, Text } from "react-native";
import React from "react";

type Props = {
  title: string;
  description: string;
};

const Description = ({ title, description }: Props) => {
  return (
    <View>
      <Text className="font-medium font-poppins-md">{title}</Text>
      <Text className="text-gray-600 font-poppins">{description}</Text>
    </View>
  );
};

export default Description;
