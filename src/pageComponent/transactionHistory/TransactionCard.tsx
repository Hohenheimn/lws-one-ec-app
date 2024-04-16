import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { dateString } from "@/src/utils/dateHelper";
import { TransactionListData } from "@/src/types/TransactionList";

type Props = {
  transaction: TransactionListData;
  onPress: (transacntionData: TransactionListData) => void;
};

const TransactionCard = ({ transaction, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="flex-row items-start justify-between border border-gray-300 rounded-lg p-4"
      onPress={() => onPress(transaction)}
    >
      <View>
        <Text className="text-lg font-medium font-poppins-md">
          Sent via {transaction?.paymentMedium}
        </Text>
        <Text className="text-sm font-poppins text-gray-500">
          {dateString(transaction?.createdAt || "")}
        </Text>
      </View>
      <Text className="text-2xl font-medium font-poppins-md">
        {Number(transaction?.paymentAmount).toLocaleString("en-US", {
          style: "currency",
          currency: "PHP",
        })}
      </Text>
    </TouchableOpacity>
  );
};

export default TransactionCard;
