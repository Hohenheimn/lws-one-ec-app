import { Bill, BillData } from "@/src/types/Bill";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { twMerge } from "tailwind-merge";

type Props = {
  bill: BillData;
  onPress: (billData: BillData) => void;
};
const BillCard = ({ bill, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="flex-row items-start justify-between border border-gray-300 rounded-lg p-4 my-2"
      onPress={() => onPress(bill)}
    >
      <View>
        <Text className="text-lg font-medium font-poppins-md">
          {bill?.readableFromDate}
        </Text>
        <Text
          className={twMerge(
            "text-xs font-poppins text-white w-16 p-1 text-center rounded-full",
            bill?.billPaid ? "bg-green-400" : "bg-red-400"
          )}
        >
          {bill.billPaid ? "PAID" : "UNPAID"}
        </Text>
      </View>
      <Text className="text-2xl font-medium font-poppins-md">
        {Number(bill?.totalAmountToPay).toLocaleString("en-US", {
          style: "currency",
          currency: "PHP",
        })}
      </Text>
    </TouchableOpacity>
  );
};

export default BillCard;
