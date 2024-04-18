import React from "react";
import { View, Text } from "react-native";

import {
  TransactionList,
  TransactionListData,
} from "@/src/types/TransactionList";
import { dateString } from "@/src/utils/dateHelper";

type Props = {
  item: TransactionListData;
};

const BillDashboardItem = ({ item }: Props) => {
  return (
    <View className=" flex-row justify-between items-center">
      <Text className=" font-bold text-base">
        {dateString(item.bill.dueDate)}
      </Text>
      <Text className=" font-bold text-base">
        {Number(item.paymentAmount).toLocaleString("en-US", {
          style: "currency",
          currency: "PHP",
        })}
      </Text>
    </View>
  );
};

export default BillDashboardItem;
