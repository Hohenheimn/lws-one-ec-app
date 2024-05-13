import React from "react";
import { TouchableOpacity, View, Text, Image, ImageProps } from "react-native";

type PropsType = {
  paymentHandler: () => void;
  logoUrl: ImageProps;
  name: string;
  description: string;
};

const PaymentCard = ({
  paymentHandler,
  logoUrl,
  name,
  description,
}: PropsType) => {
  return (
    <TouchableOpacity
      className="border-b-[1px] border-gray-300 rounded-lg p-2 flex-row items-center justify-between"
      onPress={paymentHandler}
    >
      <View className="flex-1">
        <Text className="font-poppins-sb font-semibold text-lg">{name}</Text>
        <Text className="text-gray-600">{description}</Text>
      </View>
      <Image
        source={logoUrl}
        className="w-28 h-6 object-contain"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default PaymentCard;
