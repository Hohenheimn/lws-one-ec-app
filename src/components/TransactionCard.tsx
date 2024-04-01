import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  title?: string;
  datetime?: string;
  amount: number;
};

const TransactionCard = ({ title, datetime, amount }: Props) => {
  return (
    <TouchableOpacity className="flex-row items-start justify-between border border-gray-300 rounded-lg p-4">
      <View>
        <Text className="text-lg font-medium font-poppins-md">{title}</Text>
        <Text className="text-sm font-poppins text-gray-500">{datetime}</Text>
      </View>
      <Text className="text-2xl font-medium font-poppins-md">
        {amount.toLocaleString("en-US", { style: "currency", currency: "PHP" })}
      </Text>
    </TouchableOpacity>
  );
};

export default TransactionCard;
