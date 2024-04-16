import React from "react";
import { Modal, View } from "react-native";

import Button from "@/src/components/Button";

import Heading from "@/src/components/Heading";

import LabelValue from "@/src/components/LabelValue";

import { dateString } from "@/src/utils/dateHelper";

import { TransactionType } from "./TransactionCard";

type Props = {
  transaction: TransactionType | null;
  onClose: () => void;
};

const TransactionModal = ({ transaction, onClose }: Props) => {
  return (
    <Modal
      visible={transaction ? true : false}
      onRequestClose={onClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View className=" flex-1 p-5 items-center w-full ">
        <Heading size={"medium"} classname="mb-5">
          Transaction Detail
        </Heading>

        <LabelValue
          label={"Reference #"}
          value={transaction?.referenceNumber}
        />

        <LabelValue label={"Bill"} value={transaction?.bill?.refNumber} />

        <LabelValue
          label={"Date of Payment"}
          value={dateString(transaction?.createdAt || "")}
        />

        <LabelValue
          label={"Amount"}
          value={Number(transaction?.paymentAmount).toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
          })}
        />

        <LabelValue label={"Sent Via"} value={transaction?.paymentMedium} />
        <Button
          title={"Close"}
          className=" w-full"
          appearance={"primary"}
          onPress={onClose}
        />
      </View>
    </Modal>
  );
};

export default TransactionModal;
