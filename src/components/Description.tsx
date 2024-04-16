import { View, Text } from "react-native";
import React from "react";

type Props<T> = {
  title: string;
  description: string | undefined | Array<T>;
};

const Description = <T,>({ title, description }: Props<T>) => {
  if (typeof description === "string") {
    return (
      <View className="my-2">
        <Text className="font-medium font-poppins-md">{title}</Text>
        <Text className="text-gray-600 font-poppins">{description}</Text>
      </View>
    );
  }
  const address = description?.join(", ");
  return (
    <View className="my-2">
      <Text className="font-medium font-poppins-md">{title}</Text>
      {description?.map((item: any, index) => (
        <Text
          key={index}
          className="text-gray-600 font-poppins"
        >{`${item.label}`}</Text>
      ))}
    </View>
  );
};

export default Description;
