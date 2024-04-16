import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export type BillType = {
  amountDue: number;
  billDeleted: boolean;
  billPaid: boolean;
  dueDate: string;
  fromDate: string;
  id: number;
  kwConsumes: string;
  meterId: number;
  penaltyPercentage: string;
  rateUponReading: string;
  readableFromDate: string;
  readableReadingDate: string;
  readableToDate: string;
  readabledueDate: string;
  readingDate: string;
  refNumber: string;
  toDate: string;
  totalAmountToPay: string;
};

type Props = {
  bill: BillType;
  onPress: (billData: BillType) => void;
};
const BillCard = ({ bill, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="flex-row items-start justify-between border border-gray-300 rounded-lg p-4"
      onPress={() => onPress(bill)}
    >
      <View>
        <Text className="text-lg font-medium font-poppins-md">
          {bill?.readableFromDate}
        </Text>
        <Text className="text-sm font-poppins text-gray-500">
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
